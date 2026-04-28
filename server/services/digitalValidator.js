const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isFormatValid = re.test(email);
  
  if (!isFormatValid) return { risk: 'High', message: 'Invalid email format' };
  
  const domain = email.split('@')[1];
  const suspiciousDomains = ['tempmail.com', 'throwaway.com', 'mailinator.com', '10minutemail.com'];
  
  if (suspiciousDomains.includes(domain)) {
    return { risk: 'High', message: 'Suspicious disposable email domain' };
  }
  
  return { risk: 'Low', message: 'Likely safe' };
};

const validatePhone = (phone) => {
  // Simple check for digits and length
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) {
    return { risk: 'High', message: 'Invalid phone number length' };
  }
  
  // Check for common patterns or country codes if needed
  if (phone.startsWith('+1') || phone.startsWith('+91')) {
     return { risk: 'Low', message: 'Valid country code format' };
  }

  return { risk: 'Medium', message: 'Unverified country code' };
};

module.exports = { validateEmail, validatePhone };
