const express = require('express');
const router = express.Router();
const { getIP, getLocation, getWeather, getNewsCount } = require('../services/apiClient');
const { calculateSafetyScore } = require('../services/safetyEngine');

// GET Dashboard Safety Status
router.get('/status', async (req, res) => {
  try {
    const ip = await getIP();
    if (!ip) return res.status(500).json({ error: 'Could not detect IP' });

    const location = await getLocation(ip);
    if (!location || location.status === 'fail') {
      return res.status(500).json({ error: 'Could not detect location' });
    }

    const { lat, lon, city } = location;
    const weather = await getWeather(lat, lon);
    const newsCount = await getNewsCount(city, process.env.GNEWS_API_KEY);
    
    const hour = new Date().getHours();
    const isNight = hour >= 18 || hour < 6;

    const safetyData = calculateSafetyScore({
      weather,
      newsCount,
      isNight,
      contextRisk: 2 // Default baseline
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
