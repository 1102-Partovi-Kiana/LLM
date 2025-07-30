const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { username, password, email, fullName } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, fullName, password: hashed });
    res.status(201).json({ message: 'User created' });
  } catch {
    res.status(400).json({ error: 'Username or email already exists' });
  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
