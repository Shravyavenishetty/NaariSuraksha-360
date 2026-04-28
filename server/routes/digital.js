const express = require('express');
const router = express.Router();
const { validateEmail, validatePhone } = require('../services/digitalValidator');

router.post('/validate-email', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });
  
  const result = validateEmail(email);
  res.json(result);
});

router.post('/validate-phone', (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone number is required' });
  
  const result = validatePhone(phone);
  res.json(result);
});

module.exports = router;
