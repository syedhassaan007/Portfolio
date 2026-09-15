const { pool } = require('../config/db');

/**
 * Builds standard GET-all / GET-one / POST / PUT / DELETE handlers for a
 * simple table. Keeps controllers/routes consistent across skills,
 * certifications, education, projects, experience, and achievements
 * instead of hand-rolling the same CRUD five times.
 *
 * @param {string} table - table name (already trusted, not user input)
 * @param {string[]} fields - column names allowed to be written via the API
 * @param {string} orderBy - default ORDER BY clause
 */
function crudFactory(table, fields, orderBy = 'display_order ASC, id ASC') {
  return {
    async getAll(req, res, next) {
      try {
        const [rows] = await pool.query(`SELECT * FROM \`${table}\` ORDER BY ${orderBy}`);
        res.json(rows);
      } catch (err) {
        next(err);
      }
    },

    async getOne(req, res, next) {
      try {
        const [rows] = await pool.query(`SELECT * FROM \`${table}\` WHERE id = ?`, [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: `${table} record not found.` });
        res.json(rows[0]);
      } catch (err) {
        next(err);
      }
    },

    async create(req, res, next) {
      try {
        const data = pickFields(req.body, fields);
        const columns = Object.keys(data);
        if (columns.length === 0) {
          return res.status(400).json({ error: 'No valid fields provided.' });
        }
        const placeholders = columns.map(() => '?').join(', ');
        const [result] = await pool.query(
          `INSERT INTO \`${table}\` (${columns.map((c) => `\`${c}\``).join(', ')}) VALUES (${placeholders})`,
          columns.map((c) => data[c])
        );
        const [rows] = await pool.query(`SELECT * FROM \`${table}\` WHERE id = ?`, [result.insertId]);
        res.status(201).json(rows[0]);
      } catch (err) {
        next(err);
      }
    },

    async update(req, res, next) {
      try {
        const data = pickFields(req.body, fields);
        const columns = Object.keys(data);
        if (columns.length === 0) {
          return res.status(400).json({ error: 'No valid fields provided.' });
        }
        const setClause = columns.map((c) => `\`${c}\` = ?`).join(', ');
        const [result] = await pool.query(
          `UPDATE \`${table}\` SET ${setClause} WHERE id = ?`,
          [...columns.map((c) => data[c]), req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: `${table} record not found.` });
        const [rows] = await pool.query(`SELECT * FROM \`${table}\` WHERE id = ?`, [req.params.id]);
        res.json(rows[0]);
      } catch (err) {
        next(err);
      }
    },

    async remove(req, res, next) {
      try {
        const [result] = await pool.query(`DELETE FROM \`${table}\` WHERE id = ?`, [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: `${table} record not found.` });
        res.status(204).send();
      } catch (err) {
        next(err);
      }
    },
  };
}

function pickFields(body, allowed) {
  const out = {};
  for (const key of allowed) {
    if (Object.prototype.hasOwnProperty.call(body, key)) {
      out[key] = body[key];
    }
  }
  return out;
}

module.exports = crudFactory;
