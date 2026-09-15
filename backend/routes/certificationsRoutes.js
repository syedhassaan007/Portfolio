const express = require('express');
const crudFactory = require('../controllers/crudFactory');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
const handlers = crudFactory('certifications', ['name', 'issuer', 'issue_date', 'credential_id', 'credential_url', 'badge_url', 'description', 'skills_covered', 'display_order']);

router.get('/', handlers.getAll);
router.get('/:id', handlers.getOne);
router.post('/', requireAuth, handlers.create);
router.put('/:id', requireAuth, handlers.update);
router.delete('/:id', requireAuth, handlers.remove);

module.exports = router;
