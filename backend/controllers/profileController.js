const { pool } = require('../config/db');

const FIELDS = [
  'full_name', 'title', 'tagline', 'bio', 'location',
  'email', 'phone', 'avatar_url', 'resume_url',
];

async function getProfile(req, res, next) {
  try {
    const [rows] = await pool.query('SELECT * FROM profile WHERE id = 1');
    if (rows.length === 0) return res.status(404).json({ error: 'Profile not set up yet.' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

async function updateProfile(req, res, next) {
  try {
    const data = {};
    for (const key of FIELDS) {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) data[key] = req.body[key];
    }
    const columns = Object.keys(data);
    if (columns.length === 0) return res.status(400).json({ error: 'No valid fields provided.' });

    const setClause = columns.map((c) => `\`${c}\` = ?`).join(', ');
    await pool.query(`UPDATE profile SET ${setClause} WHERE id = 1`, columns.map((c) => data[c]));
    const [rows] = await pool.query('SELECT * FROM profile WHERE id = 1');
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

module.exports = { getProfile, updateProfile };
