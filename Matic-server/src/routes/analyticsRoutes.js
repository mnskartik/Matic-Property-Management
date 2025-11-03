const express = require('express');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');
const { overview,agentAnalytics } = require('../controllers/analyticsController');

const router = express.Router();
router.get('/overview', protect, authorize('admin'), overview);
router.get('/agent', protect, authorize('agent'), agentAnalytics);

module.exports = router;
