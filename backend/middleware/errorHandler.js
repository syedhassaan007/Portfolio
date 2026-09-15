const { validationResult } = require('express-validator');

// Run after express-validator checks in a route; short-circuits with a
// clean 400 response if any field failed validation.
function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation failed.', details: errors.array() });
  }
  next();
}

// Catches anything thrown/rejected inside route handlers so the API
// always returns clean JSON instead of leaking a stack trace.
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error('[error]', err);
  const status = err.status || 500;
  res.status(status).json({
    error: status === 500 ? 'Something went wrong on the server.' : err.message,
  });
}

function notFound(req, res) {
  res.status(404).json({ error: 'Route not found.' });
}

module.exports = { validate, errorHandler, notFound };
