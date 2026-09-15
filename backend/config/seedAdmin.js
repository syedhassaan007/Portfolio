// Creates (or updates the password of) the initial admin account
// from ADMIN_USERNAME / ADMIN_PASSWORD in .env.
// Run once with: npm run seed:admin
require('dotenv').config();
const bcrypt = require('bcryptjs');
const { pool } = require('./db');

async function run() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    console.error('[seed:admin] Set ADMIN_USERNAME and ADMIN_PASSWORD in your .env first.');
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO admin_users (username, password_hash) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`,
    [username, passwordHash]
  );

  console.log(`[seed:admin] Admin user "${username}" is ready. You can now log in at /admin/login.`);
  process.exit(0);
}

run().catch((err) => {
  console.error('[seed:admin] Failed:', err.message);
  process.exit(1);
});
