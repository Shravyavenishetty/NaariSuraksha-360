const axios = require('axios');

const getIP = async () => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    console.error('Error fetching IP:', error);
    return null;
  }
};

const getLocation = async (ip) => {
  try {
    // Try Provider 1
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    if (response.data && response.data.status === 'success') return response.data;
    
    // Try Provider 2 (Fallback)
    const fallback = await axios.get(`https://ipapi.co/${ip}/json/`);
    return {
      status: 'success',
      lat: fallback.data.latitude,
      lon: fallback.data.longitude,
      city: fallback.data.city
    };
  } catch (error) {
    console.error('Error fetching location:', error);
    return null;
  }
};

const getWeather = async (lat, lon) => {
  try {
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    const weather = response.data.current_weather;
    
    // Simple mapping of weather codes to conditions
    // https://open-meteo.com/en/docs
    const code = weather.weathercode;
    let condition = 'clear';
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) condition = 'rain';
    if ([45, 48].includes(code)) condition = 'fog';
    if ([95, 96, 99].includes(code)) condition = 'storm';

    return {
      temp: weather.temperature,
      condition,
      code
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return { temp: 0, condition: 'clear' };
  }
};

const xml2js = require('xml2js');

const getNewsCount = async (city, apiKey) => {
  const query = `crime OR harassment OR assault OR robbery OR safety in ${city}`;
  
  // 1. Try GNews if API key is provided
  if (apiKey) {
    try {
      const response = await axios.get(`https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&token=${apiKey}&lang=en&max=10`);
      return response.data.totalArticles || 0;
    } catch (error) {
      console.error('GNews API Error:', error.message);
      // Fall through to RSS if API fails
    }
  }

  // 2. Default: Use Google News RSS (Real data, No API key required)
  try {
    const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-IN&gl=IN&ceid=IN:en`;
    const response = await axios.get(rssUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
      }
    });
    
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(response.data);
    const items = result?.rss?.channel?.[0]?.item || [];
    
    // Return count of recent relevant news
    return items.length;
  } catch (error) {
    console.error('Google News RSS Error:', error.message);
    return 0; // Return 0 instead of fake data to keep safety score honest
  }
};

const geocodeCity = async (city) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: city,
        format: 'json',
        limit: 1,
      },
      headers: {
        'User-Agent': 'NaariSuraksha360/1.0',
      },
    });
    if (response.data && response.data.length > 0) {
      return {
        lat: parseFloat(response.data[0].lat),
        lon: parseFloat(response.data[0].lon),
        displayName: response.data[0].display_name,
      };
    }
    return null;
  } catch (error) {
    console.error('Error geocoding city:', error);
    return null;
  }
};

module.exports = { getIP, getLocation, getWeather, getNewsCount, geocodeCity };
