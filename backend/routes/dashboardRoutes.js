const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../config/dbConfig');  // Make sure this path points to your DB configuration

// Dashboard Route - Protected with JWT
router.get('/dashboard', (req, res) => {
  // Extract token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Verify the token
  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    // Query the database or return some data
    db.query('SELECT * FROM your_table', (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Database query failed' });
      }

      // Successfully fetched dashboard data
      res.json({ data: results });
    });
  });
});

module.exports = router;
