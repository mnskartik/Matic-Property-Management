const express = require('express');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');
const controller = require('../controllers/leadController');

const router = express.Router();

router.post('/', protect, authorize('tenant'), controller.createLead);
router.get('/agent', protect, authorize('agent'), controller.getLeadsForAgent);
router.get('/', protect, authorize('admin'), controller.getAllLeads);

module.exports = router;
