const db = require('../config/dbConfig');

exports.getDashboardData = (req, res) => {
  // Ensure that the user is authenticated
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) return res.status(401).json({ success: false, message: 'Unauthorized' });

    // Fetch dashboard data based on user ID
    db.query('SELECT * FROM dashboard_data WHERE user_id = ?', [decoded.id], (err, results) => {
      if (err) return res.status(500).json({ success: false, message: 'Database error' });
      res.json(results);
    });
  });
};
