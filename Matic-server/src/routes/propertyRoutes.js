const express = require('express');
const propertyController = require('../controllers/propertyController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

const router = express.Router();
router.get('/public', propertyController.getPublic);

router.get('/', protect, propertyController.getAll);

router.get('/:id', protect, propertyController.getById);
router.post('/', protect, authorize('agent'), propertyController.create);
router.put('/:id', protect, authorize('agent','admin'), propertyController.update);
router.delete('/:id', protect, authorize('agent','admin'), propertyController.remove);

router.put('/:id/approve', protect, authorize('admin'), async (req, res) => {
  const { approved } = req.body;
  const prop = await propertyController.toggleApproval(req.params.id, approved);
  res.json(prop);
});

module.exports = router;
