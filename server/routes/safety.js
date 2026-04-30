const express = require('express');
const router = express.Router();
const axios = require('axios');
const { getIP, getLocation, getWeather, getNewsCount, geocodeCity } = require('../services/apiClient');
const { calculateSafetyScore } = require('../services/safetyEngine');

// GET Dashboard Safety Status
router.get('/status', async (req, res) => {
  try {
    let lat, lng, city;
    const requestedCity = req.query.city;
    const qLat = req.query.lat;
    const qLon = req.query.lon;

    if (qLat !== undefined && qLon !== undefined) {
      lat = parseFloat(qLat);
      lng = parseFloat(qLon);
      try {
        const geo = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`, {
          headers: { 'User-Agent': 'NaariSuraksha360/1.0' }
        });
        const addr = geo.data.address;
        city = addr.city || addr.town || addr.village || addr.suburb || addr.county || addr.state_district || 'Unknown Location';
      } catch (err) {
        console.error('Reverse geocoding failed:', err.message);
        city = 'Unknown Location';
      }
    } else if (requestedCity) {
      city = requestedCity;
      const geo = await geocodeCity(requestedCity);
      if (geo) {
        lat = geo.lat;
        lng = geo.lng;
      } else {
        lat = 17.3850;
        lng = 78.4867;
      }
    } else {
      const ip = await getIP();
      const location = await getLocation(ip);
      if (!location || location.status === 'fail') {
        lat = 17.3850;
        lng = 78.4867;
        city = 'Hyderabad';
      } else {
        lat = location.lat;
        lng = location.lng || location.lon;
        city = location.city;
      }
    }

    const weather = await getWeather(lat, lng);
    const newsCount = await getNewsCount(city, process.env.GNEWS_API_KEY);
    
    const hour = new Date().getHours();
    const isNight = hour >= 18 || hour < 6;

    const safetyData = calculateSafetyScore({
      weather,
      newsCount,
      isNight,
      contextRisk: requestedCity ? 3 : 2 // Slightly higher default risk for manual searches
    });

    res.json({
      location: { city, lat, lng },
      weather,
      newsCount,
      isNight,
      ...safetyData
    });
  } catch (error) {
    console.error('Safety status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST Route Safety Analysis
router.post('/route', async (req, res) => {
  const { source, destination } = req.body;
  if (!source || !destination) {
    return res.status(400).json({ error: 'Source and destination are required' });
  }

  try {
    console.log(`Analyzing route: ${source} -> ${destination}`);
    // 1. Geocode both locations
    const sourceGeo = await geocodeCity(source);
    const destGeo = await geocodeCity(destination);

    if (!sourceGeo || !destGeo) {
      console.log('Geocoding failed for one or both locations');
      return res.status(404).json({ error: 'One or both locations could not be found' });
    }

    // 2. Fetch real route from OSRM
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${sourceGeo.lng},${sourceGeo.lat};${destGeo.lng},${destGeo.lat}?overview=full&geometries=geojson&alternatives=true`;
    console.log(`Calling OSRM: ${osrmUrl}`);
    const osrmRes = await axios.get(osrmUrl, { timeout: 10000 });
    
    if (!osrmRes.data || !osrmRes.data.routes || osrmRes.data.routes.length === 0) {
      console.log('No routes found in OSRM response');
      throw new Error('No routes found');
    }

    console.log(`Found ${osrmRes.data.routes.length} routes`);
    // 3. Process OSRM routes into our format
    const destinationNews = await getNewsCount(destination, process.env.GNEWS_API_KEY);
    const weather = await getWeather(sourceGeo.lat, sourceGeo.lon);
    const hour = new Date().getHours();
    const isNight = hour >= 18 || hour < 6;

    const mappedRoutes = osrmRes.data.routes.map((r, i) => {
      const distanceKm = (r.distance / 1000).toFixed(1);
      const durationMin = Math.round(r.duration / 60);
      
      // Calculate a base safety score for this specific route
      // We simulate route-specific risk by hashing the geometry coordinates
      // This ensures different paths have different (but consistent) risk profiles
      const pathHash = r.geometry.coordinates.length % 10; 
      const spatialRisk = pathHash > 7 ? 8 : (pathHash > 4 ? 4 : 2);

      const safetyResult = calculateSafetyScore({
        weather,
        newsCount: destinationNews,
        isNight,
        contextRisk: spatialRisk + (i * 2) // Alternatives are usually less optimal/monitored
      });

      const risk = safetyResult.label === 'High Risk' ? 'High' : (safetyResult.label === 'Moderate' ? 'Moderate' : 'Low');
      
      return {
        id: String.fromCharCode(65 + i), 
        type: i === 0 ? 'Safe' : 'Alternative',
        label: i === 0 ? `Route ${String.fromCharCode(65 + i)} (Recommended)` : `Route ${String.fromCharCode(65 + i)}`,
        name: i === 0 ? 'Primary Arterial Road' : `Side Street Path ${i}`,
        score: (10 - safetyResult.score).toFixed(1), // Invert score so 10 is safest
        status: safetyResult.label === 'Safe' ? '🟢 EXCELLENT SAFE' : safetyResult.label === 'Moderate' ? '🟡 MODERATE' : '🔴 RISKY AREA',
        dist: `${distanceKm} km`,
        time: `${durationMin} mins`,
        color: safetyResult.color === 'green' ? 'text-[#22C55E]' : safetyResult.color === 'yellow' ? 'text-amber-500' : 'text-rose-500',
        tags: safetyResult.score < 4 ? ['Well Lit', 'Main Road'] : ['Unverified Lighting'],
        geometry: r.geometry,
        risk: risk,
        insights: safetyResult.factors
      };
    });

    // Best recommendation based on score
    const bestRoute = [...mappedRoutes].sort((a, b) => b.score - a.score)[0];

    let recommendation = 'Safe to travel';
    if (bestRoute.risk === 'Moderate') recommendation = 'Caution: Moderate risk detected in some sectors';
    if (bestRoute.risk === 'High') recommendation = 'High Risk: Significant incidents or poor conditions reported';

    res.json({
      source: sourceGeo.displayName,
      destination: destGeo.displayName,
      sourceCoords: { lat: sourceGeo.lat, lng: sourceGeo.lng },
      destCoords: { lat: destGeo.lat, lng: destGeo.lng },
      routes: mappedRoutes,
      recommendation,
      destinationRisk: bestRoute.risk,
      analysisContext: { isNight, weather: weather.condition }
    });
  } catch (error) {
    console.error('Route analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze routes', details: error.message });
  }
});
module.exports = router;
