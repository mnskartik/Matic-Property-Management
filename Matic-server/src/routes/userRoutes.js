const express = require('express');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');
const { getAll, updateStatus } = require('../controllers/userController');

const router = express.Router();

router.use(protect, authorize('admin'));
router.get('/', getAll);
router.put('/:id/status', updateStatus);

module.exports = router;
