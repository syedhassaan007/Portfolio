const express = require('express');
const { body } = require('express-validator');
const rateLimit = require('express-rate-limit');
const {
  submitMessage, getAllMessages, markRead, deleteMessage,
} = require('../controllers/contactController');
const { requireAuth } = require('../middleware/auth');
const { validate } = require('../middleware/errorHandler');

const router = express.Router();

// Basic abuse protection on the public submit endpoint.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many messages sent. Please try again later.' },
});

router.post(
  '/',
  contactLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required.'),
    body('email').isEmail().withMessage('A valid email is required.'),
    body('message').trim().isLength({ min: 5 }).withMessage('Message is too short.'),
  ],
  validate,
  submitMessage
);

router.get('/', requireAuth, getAllMessages);
router.put('/:id/read', requireAuth, markRead);
router.delete('/:id', requireAuth, deleteMessage);

module.exports = router;
