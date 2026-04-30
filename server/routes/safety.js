const express = require('express');
const router = express.Router();
const { getIP, getLocation, getWeather, getNewsCount, geocodeCity } = require('../services/apiClient');
const { calculateSafetyScore } = require('../services/safetyEngine');

// GET Dashboard Safety Status
router.get('/status', async (req, res) => {
  try {
    let lat, lon, city;
    const requestedCity = req.query.city;

    if (requestedCity) {
      city = requestedCity;
      // Use real geocoding to get coordinates for the searched city
      const geo = await geocodeCity(requestedCity);
      if (geo) {
        lat = geo.lat;
        lon = geo.lon;
      } else {
        // Fallback if geocoding fails
        lat = 17.3850;
        lon = 78.4867;
      }
    } else {
      const ip = await getIP();
      if (!ip) return res.status(500).json({ error: 'Could not detect IP' });

      const location = await getLocation(ip);
      if (!location || location.status === 'fail') {
        return res.status(500).json({ error: 'Could not detect location' });
      }
      lat = location.lat;
      lon = location.lon;
      city = location.city;
    }

    const weather = await getWeather(lat, lon);
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
      location: { city, lat, lon },
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
    // Simulate 3 routes
    const routes = [
      { name: 'Route A (Main Road)', risk: 'Low', distance: '5.2 km' },
      { name: 'Route B (Short Cut)', risk: 'High', distance: '4.1 km' },
      { name: 'Route C (Via Park)', risk: 'Moderate', distance: '4.8 km' }
    ];

    // Analyze destination city for more "real" simulation
    const destinationNews = await getNewsCount(destination, process.env.GNEWS_API_KEY);
    
    let recommendation = 'Safe to travel';
    if (destinationNews > 5) recommendation = 'Delay travel';
    if (destinationNews > 10) recommendation = 'Avoid route';

    res.json({
      source,
      destination,
      routes,
      recommendation,
      destinationRisk: destinationNews > 5 ? 'High' : 'Low'
    });
  } catch (error) {
    res.status(500).json({ error: 'Route analysis failed' });
  }
});

module.exports = router;
