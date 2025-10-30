const express = require('express');
const propertyController = require('../controllers/propertyController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

const router = express.Router();

router.get('/', protect, propertyController.getAll); // protect to know role; you can remove protect to make public
router.get('/:id', protect, propertyController.getById);
router.post('/', protect, authorize('agent'), propertyController.create);
router.put('/:id', protect, authorize('agent','admin'), propertyController.update);
router.delete('/:id', protect, authorize('agent','admin'), propertyController.remove);

module.exports = router;
