const db = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error' });
    if (results.length === 0) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (err || !match) return res.status(401).json({ success: false, message: 'Invalid credentials' });

      const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });
      res.json({ success: true, token });
    });
  });
};

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ success: false, message: 'Server error' });

    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err) => {
      if (err) return res.status(500).json({ success: false, message: 'Database error' });
      res.json({ success: true });
    });
  });
};
