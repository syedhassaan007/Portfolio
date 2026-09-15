const express = require('express');
const { body } = require('express-validator');
const { getProfile, updateProfile } = require('../controllers/profileController');
const { requireAuth } = require('../middleware/auth');
const { validate } = require('../middleware/errorHandler');

const router = express.Router();

router.get('/', getProfile);

router.put(
  '/',
  requireAuth,
  [
    body('email').optional().isEmail().withMessage('Must be a valid email.'),
    body('full_name').optional().trim().notEmpty(),
  ],
  validate,
  updateProfile
);

module.exports = router;
