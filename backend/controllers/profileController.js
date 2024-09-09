const db = require('../config/dbConfig'); // Adjust path if needed
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');

exports.getUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [decoded.userId]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user data' });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const { name, email, password, mobile, user_type, gender, address, pincode, state, country } = req.body;
    let imagePath = req.file ? req.file.filename : '';

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    await db.query(
      'UPDATE users SET name = ?, email = ?, password = ?, mobile = ?, user_type = ?, gender = ?, address = ?, pincode = ?, state = ?, country = ?, image = ? WHERE id = ?',
      [
        name,
        email,
        hashedPassword || null,
        mobile,
        user_type,
        gender,
        address,
        pincode,
        state,
        country,
        imagePath,
        decoded.userId,
      ]
    );

    res.status(200).json({ success: true, message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile' });
  }
};
