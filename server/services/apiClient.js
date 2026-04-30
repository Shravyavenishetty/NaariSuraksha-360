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
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    return response.data;
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

const getNewsCount = async (city, apiKey) => {
  if (!apiKey) {
    // Simulated news count based on city string length/hash for consistency
    const hash = city.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (hash % 12); // Returns 0-11
  }
  try {
    const query = `crime OR harassment OR assault OR robbery in ${city}`;
    const response = await axios.get(`https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&token=${apiKey}&lang=en&max=10`);
    return response.data.totalArticles || 0;
  } catch (error) {
    console.error('Error fetching news:', error);
    // Fallback simulation on error
    const hash = city.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (hash % 8); 
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
