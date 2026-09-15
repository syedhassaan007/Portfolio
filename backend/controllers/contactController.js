const { pool } = require('../config/db');

async function submitMessage(req, res, next) {
  try {
    const { name, email, subject, message } = req.body;
    const [result] = await pool.query(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject || null, message]
    );
    res.status(201).json({ id: result.insertId, message: 'Your message has been sent. Thanks for reaching out.' });
  } catch (err) {
    next(err);
  }
}

// Admin-only: view submitted messages.
async function getAllMessages(req, res, next) {
  try {
    const [rows] = await pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function markRead(req, res, next) {
  try {
    const [result] = await pool.query('UPDATE contact_messages SET is_read = TRUE WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Message not found.' });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function deleteMessage(req, res, next) {
  try {
    const [result] = await pool.query('DELETE FROM contact_messages WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Message not found.' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { submitMessage, getAllMessages, markRead, deleteMessage };
