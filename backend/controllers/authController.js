const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const [rows] = await pool.query('SELECT * FROM admin_users WHERE username = ?', [username]);
    const user = rows[0];

    // Compare against a dummy hash even when the user doesn't exist, so
    // response timing doesn't reveal whether a username is valid.
    const validHash = user ? user.password_hash : '$2a$10$invalidsaltinvalidsaltinvalidsaltinvalidsal';
    const passwordMatches = await bcrypt.compare(password, validHash);

    if (!user || !passwordMatches) {
      return res.status(401).json({ error: 'Incorrect username or password.' });
    }

    const token = jwt.sign(
      { sub: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '2h' }
    );

    res.json({ token, username: user.username, expiresIn: process.env.JWT_EXPIRES_IN || '2h' });
  } catch (err) {
    next(err);
  }
}

// Lets the admin frontend verify a stored token is still valid on load.
async function me(req, res) {
  res.json({ username: req.admin.username });
}

module.exports = { login, me };
