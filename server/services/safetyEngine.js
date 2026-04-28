const calculateSafetyScore = ({ weather, newsCount, isNight, contextRisk = 0 }) => {
  // 1. Weather Risk (0-10)
  // Rain -> +2, Fog -> +3, Clear -> 0
  let weatherRisk = 0;
  if (weather.condition === 'rain') weatherRisk = 4; // Normalized to 10 scale if needed, but let's use the rules
  if (weather.condition === 'fog') weatherRisk = 6;
  if (weather.condition === 'storm') weatherRisk = 8;
  
  // 2. News Risk (0-10)
  // 0-2 -> Low (2), 3-5 -> Medium (6), 6+ -> High (10)
  let newsRisk = 0;
  if (newsCount <= 2) newsRisk = 2;
  else if (newsCount <= 5) newsRisk = 6;
  else newsRisk = 10;

  // 3. Time Risk (0-10)
  // Night -> +3 (let's normalize to 10 if we want a 0-10 score)
  // Rules say Night -> +3. Let's interpret as 0 or 10 for calculation and then weight.
  const timeRisk = isNight ? 10 : 0;

  // 4. Context Risk (0-10)
  // Baseline or user-provided
  const normalizedContextRisk = contextRisk * 1; 

  // Final Score Calculation (0-10)
  // Score = (Weather Risk * 0.3) + (News Risk * 0.4) + (Time Risk * 0.2) + (Context Risk * 0.1)
  // Note: If we use the raw "+3" rules, the score won't be 0-10. 
  // Let's stick to the user's formula but ensure risks are 0-10.
  
  const score = (weatherRisk * 0.3) + (newsRisk * 0.4) + (timeRisk * 0.2) + (normalizedContextRisk * 0.1);
  
  let label = 'Safe';
  let color = 'green';
  
  if (score >= 7) {
    label = 'High Risk';
    color = 'red';
  } else if (score >= 4) {
    label = 'Moderate';
    color = 'yellow';
  }

  return {
    score: parseFloat(score.toFixed(1)),
    label,
    color,
    factors: {
      weatherRisk,
      newsRisk,
      timeRisk,
      contextRisk: normalizedContextRisk
    }
  };
};

module.exports = { calculateSafetyScore };
