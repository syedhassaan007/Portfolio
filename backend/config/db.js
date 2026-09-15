// MySQL connection pool.
// Credentials are read from environment variables only — never hardcoded,
// never sent to the frontend.
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
});

// Fail fast with a clear message if the DB is unreachable, instead of
// letting every route error out mysteriously.
async function verifyConnection() {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    console.log(`[db] Connected to MySQL database "${process.env.DB_NAME}" at ${process.env.DB_HOST}:${process.env.DB_PORT || 3306}`);
  } catch (err) {
    console.error('[db] Could not connect to MySQL. Check your .env values and that MySQL is running.');
    console.error(`[db] ${err.message}`);
  }
}

module.exports = { pool, verifyConnection };
