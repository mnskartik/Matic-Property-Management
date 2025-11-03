const express = require('express');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');
const controller = require('../controllers/leadController');

const router = express.Router();

router.post('/', protect, authorize('tenant'), controller.createLead);
router.get('/tenant', protect, authorize('tenant'), controller.getTenantLeads);
router.put('/:id', protect, authorize('tenant'), controller.updateLead);
router.delete('/:id', protect, authorize('tenant'), controller.deleteLead);
router.get('/agent', protect, authorize('agent'), controller.getLeadsForAgent);
router.get('/', protect, authorize('admin'), controller.getAllLeads);
router.post("/reply/:id", protect, authorize('agent'), controller.replyToLead);

router.patch('/status/:id', protect, authorize('agent'), controller.updateLeadStatus);

module.exports = router;
