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

    if (requestedCity) {
      city = requestedCity;
      // Use real geocoding to get coordinates for the searched city
      const geo = await geocodeCity(requestedCity);
      if (geo) {
        lat = geo.lat;
        lng = geo.lng;
      } else {
        // Fallback if geocoding fails
        lat = 17.3850;
        lng = 78.4867;
      }
    } else {
      const ip = await getIP();
      if (!ip) return res.status(500).json({ error: 'Could not detect IP' });
      
      const location = await getLocation(ip);
      if (!location || location.status === 'fail') {
        return res.status(500).json({ error: 'Could not detect location' });
      }
      lat = location.lat;
      lng = location.lng;
      city = location.city;
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
    
    const mappedRoutes = osrmRes.data.routes.map((r, i) => {
      const distanceKm = (r.distance / 1000).toFixed(1);
      const durationMin = Math.round(r.duration / 60);
      
      // Heuristic risk calculation
      let risk = 'Low';
      let score = 9.2 - (i * 1.5); 
      if (destinationNews > 10) {
        risk = 'High';
        score -= 4;
      } else if (destinationNews > 5) {
        risk = 'Moderate';
        score -= 2;
      }

      return {
        id: String.fromCharCode(65 + i), 
        type: i === 0 ? 'Safe' : 'Alternative',
        label: i === 0 ? `Route ${String.fromCharCode(65 + i)} (Safest)` : `Route ${String.fromCharCode(65 + i)}`,
        name: i === 0 ? 'Primary Path' : `Alternative Path ${i}`,
        score: score.toFixed(1),
        status: risk === 'Low' ? '🟢 EXCELLENT SAFE' : risk === 'Moderate' ? '🟡 MODERATE' : '🔴 RISKY AREA',
        dist: `${distanceKm} km`,
        time: `${durationMin} mins`,
        color: risk === 'Low' ? 'text-[#22C55E]' : risk === 'Moderate' ? 'text-amber-500' : 'text-rose-500',
        tags: i === 0 ? ['Main Roads', 'Verified'] : [],
        geometry: r.geometry,
        risk: risk
      };
    });

    let recommendation = 'Safe to travel';
    if (destinationNews > 5) recommendation = 'Caution: Recent incidents reported';
    if (destinationNews > 10) recommendation = 'Avoid travel if possible';

    res.json({
      source: sourceGeo.displayName,
      destination: destGeo.displayName,
      sourceCoords: { lat: sourceGeo.lat, lng: sourceGeo.lng },
      destCoords: { lat: destGeo.lat, lng: destGeo.lng },
      routes: mappedRoutes,
      recommendation,
      destinationRisk: destinationNews > 5 ? (destinationNews > 10 ? 'High' : 'Moderate') : 'Low'
    });
  } catch (error) {
    console.error('Route analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze routes', details: error.message });
  }
});
module.exports = router;
