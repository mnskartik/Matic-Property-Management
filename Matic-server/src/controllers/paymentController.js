const Payment = require('../models/Payment');
const Rental = require('../models/RentalReq');

// Mock payment processing
exports.processPayment = async (req, res) => {
  const { rentalId, amount, method = 'mock' } = req.body;

  const rental = await Rental.findById(rentalId);
  if (!rental) return res.status(404).json({ message: 'Rental not found' });

  // For mock: simple validation and random success/fail simulation (here succeed always)
  const success = true;

  const payment = await Payment.create({
    rentalId,
    amount,
    method,
    status: success ? 'success' : 'failed'
  });

  if (success) {
    rental.paymentStatus = 'paid';
    await rental.save();
  }

  res.status(201).json({ payment, message: success ? 'Payment succeeded (mock)' : 'Payment failed (mock)' });
};

// Get payments (admin sees all, tenant sees own)
exports.getPayments = async (req, res) => {
  if (req.user.role === 'admin') {
    const payments = await Payment.find().populate({ path: 'rentalId', populate: { path: 'tenantId propertyId' } });
    return res.json(payments);
  }
  // tenant
  const rentals = await Rental.find({ tenantId: req.user._id }).select('_id');
  const rentalIds = rentals.map(r => r._id);
  const payments = await Payment.find({ rentalId: { $in: rentalIds } }).populate('rentalId');
  res.json(payments);
};


exports.makePayment = async (req, res) => {
  const { rentalId } = req.body;
  const rental = await Rental.findById(rentalId);
  if (!rental) return res.status(404).json({ message: "Rental not found" });

  rental.paymentStatus = "paid";
  await rental.save();

  res.json({ message: "Payment successful (mock)", rental });
};
