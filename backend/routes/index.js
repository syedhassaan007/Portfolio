const express = require('express');

const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/profile', require('./profileRoutes'));
router.use('/skills', require('./skillsRoutes'));
router.use('/certifications', require('./certificationsRoutes'));
router.use('/education', require('./educationRoutes'));
router.use('/projects', require('./projectsRoutes'));
router.use('/experience', require('./experienceRoutes'));
router.use('/achievements', require('./achievementsRoutes'));
router.use('/social-links', require('./socialLinksRoutes'));
router.use('/contact', require('./contactRoutes'));

router.get('/health', (req, res) => res.json({ status: 'ok' }));

module.exports = router;
