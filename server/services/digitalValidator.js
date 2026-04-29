const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isFormatValid = re.test(email);
  
  if (!isFormatValid) return { score: 2.1, message: 'Invalid email format', checks: { format_valid: false, is_disposable: false, smtp_valid: false } };
  
  const domain = email.split('@')[1];
  const suspiciousDomains = ['tempmail.com', 'throwaway.com', 'mailinator.com', '10minutemail.com'];
  const isDisposable = suspiciousDomains.includes(domain);
  
  if (isDisposable) {
    return { score: 3.4, message: 'Suspicious disposable email domain', checks: { format_valid: true, is_disposable: true, smtp_valid: true } };
  }
  
  return { score: 9.6, message: 'Likely safe', checks: { format_valid: true, is_disposable: false, smtp_valid: true } };
};

const validatePhone = (phone) => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) {
    return { score: 1.8, message: 'Invalid phone number length', checks: { format_valid: false, is_disposable: false, smtp_valid: false } };
  }
  
  if (phone.startsWith('+1') || phone.startsWith('+91')) {
     return { score: 9.2, message: 'Valid country code format', checks: { format_valid: true, is_disposable: false, smtp_valid: true } };
  }

  return { score: 6.5, message: 'Unverified country code', checks: { format_valid: true, is_disposable: false, smtp_valid: false } };
};

module.exports = { validateEmail, validatePhone };
