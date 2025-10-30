const express = require('express');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');
const { overview } = require('../controllers/analyticsController');

const router = express.Router();
router.get('/overview', protect, authorize('admin'), overview);

module.exports = router;
