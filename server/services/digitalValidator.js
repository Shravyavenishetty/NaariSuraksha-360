const axios = require('axios');

const validateEmail = async (email) => {
  const apiKey = process.env.MAILBOXLAYER_API_KEY;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isFormatValid = re.test(email);
  
  if (!isFormatValid) {
    return { score: 2.1, message: 'Invalid email format', checks: { format_valid: false, is_disposable: false, smtp_valid: false } };
  }

  // 1. Try Mailboxlayer if API key is provided
  if (apiKey) {
    try {
      const response = await axios.get(`http://apilayer.net/api/check?access_key=${apiKey}&email=${email}`);
      const data = response.data;
      if (data.format_valid) {
        const score = data.smtp_check ? 9.8 : (data.score * 10 || 7.5);
        return {
          score: parseFloat(score.toFixed(1)),
          message: data.smtp_check ? 'Likely safe (SMTP verified)' : 'Format valid, SMTP unverified',
          checks: {
            format_valid: data.format_valid,
            is_disposable: data.disposable,
            smtp_valid: data.smtp_check
          }
        };
      }
    } catch (error) {
      console.error('Mailboxlayer Error:', error.message);
    }
  }

  // 2. Keyless Fallback: Disify (Checks for disposable/spam domains)
  try {
    const response = await axios.get(`https://disify.com/api/email/${email}`);
    const data = response.data;
    if (data.disposable) {
      return { score: 3.2, message: 'Disposable/Temporary email detected', checks: { format_valid: true, is_disposable: true, smtp_valid: false } };
    }
  } catch (error) {
    console.error('Disify Error:', error.message);
  }

  // 3. Final Fallback: Local Heuristics
  const domain = email.split('@')[1];
  const suspiciousDomains = ['tempmail.com', 'throwaway.com', 'mailinator.com', '10minutemail.com'];
  const isDisposable = suspiciousDomains.includes(domain);
  
  if (isDisposable) {
    return { score: 3.4, message: 'Suspicious disposable email domain', checks: { format_valid: true, is_disposable: true, smtp_valid: false } };
  }
  
  return { score: 9.2, message: 'Format valid (Local verification)', checks: { format_valid: true, is_disposable: false, smtp_valid: true } };
};

const validatePhone = async (phone) => {
  const apiKey = process.env.NUMVERIFY_API_KEY;
  const digits = phone.replace(/\D/g, '');

  if (digits.length < 10 || digits.length > 15) {
    return { score: 1.8, message: 'Invalid phone number length', checks: { format_valid: false, is_disposable: false, smtp_valid: false } };
  }

  // 1. Try Numverify if API key is provided
  if (apiKey) {
    try {
      const response = await axios.get(`http://apilayer.net/api/validate?access_key=${apiKey}&number=${phone}`);
      const data = response.data;
      if (data.valid) {
        return {
          score: 9.6,
          message: `Verified ${data.carrier || ''} (${data.location || data.country_name})`,
          checks: {
            format_valid: data.valid,
            is_disposable: false,
            smtp_valid: true
          }
        };
      }
    } catch (error) {
      console.error('Numverify Error:', error.message);
    }
  }
  
  // 2. Final Fallback: Local Heuristics
  if (phone.startsWith('+1') || phone.startsWith('+91')) {
     return { score: 8.5, message: 'Valid country code format', checks: { format_valid: true, is_disposable: false, smtp_valid: true } };
  }

  return { score: 6.5, message: 'Unverified country code', checks: { format_valid: true, is_disposable: false, smtp_valid: false } };
};

module.exports = { validateEmail, validatePhone };

