const express = require('express');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');
const controller = require('../controllers/paymentController');
const { makePayment } = require("../controllers/paymentController");
const router = express.Router();

router.post('/', protect, authorize('tenant'), controller.processPayment);
router.get('/', protect, controller.getPayments); // admin gets all, tenant gets own
router.post("/", protect, authorize("tenant"), makePayment);

module.exports = router;
