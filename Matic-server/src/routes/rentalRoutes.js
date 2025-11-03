const express = require('express');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');
const controller = require('../controllers/rentalController');

const router = express.Router();

router.post('/', protect, authorize('tenant'), controller.createRental);
router.get('/me', protect, authorize('tenant'), controller.getMyRentals);
router.get('/agent', protect, authorize('agent','admin'), controller.getRentalsForAgent);
router.get("/overview", protect, authorize("tenant"), controller.getTenantOverview);

router.put('/:id/status', protect, authorize('agent','admin'), async (req, res) => {
  const { status } = req.body;
  const rental = await Rental.findByIdAndUpdate(
    req.params.id,
    { paymentStatus: status },
    { new: true }
  );
  res.json(rental);
});




module.exports = router;
