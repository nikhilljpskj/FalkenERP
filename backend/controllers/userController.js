const db = require('../config/dbConfig');
const jwt = require('jsonwebtoken');

exports.getUser = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const userId = decoded.id;
    db.query('SELECT name, email, password, mobile, user_type, gender, image, address, pincode, state, country FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) return res.status(500).json({ success: false, message: 'Database error' });
      if (results.length > 0) {
        res.json(results[0]); // Returning the user's profile data
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
    });
  });
};
