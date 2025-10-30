const Rental = require('../models/RentalReq');
const Property = require('../models/Property');

// Tenant requests rental (for simplification we create rental record)
exports.createRental = async (req, res) => {
  const { propertyId, startDate, endDate, rentAmount } = req.body;
  const property = await Property.findById(propertyId);
  if (!property || !property.isApproved) return res.status(400).json({ message: 'Property not available' });

  const rental = await Rental.create({
    propertyId,
    tenantId: req.user._id,
    startDate,
    endDate,
    rentAmount,
    paymentStatus: 'pending'
  });
  res.status(201).json(rental);
};

// Tenant views own rentals
exports.getMyRentals = async (req, res) => {
  const rentals = await Rental.find({ tenantId: req.user._id }).populate('propertyId','title city price');
  res.json(rentals);
};

// Agent / Admin can view rentals (admin all, agent for own properties)
exports.getRentalsForAgent = async (req, res) => {
  if (req.user.role === 'admin') {
    const all = await Rental.find().populate('propertyId tenantId');
    return res.json(all);
  }
  // agent
  const props = await Property.find({ agentId: req.user._id }).select('_id');
  const propIds = props.map(p => p._id);
  const rentals = await Rental.find({ propertyId: { $in: propIds } }).populate('propertyId tenantId');
  res.json(rentals);
};




// Tenant Dashboard Overview
exports.getOverview = async (req, res) => {
  try {
    const tenantId = req.user._id;

    // Fetch total rentals, active ones, pending payments, etc.
    const rentals = await Rental.find({ tenantId });
    const totalRentals = rentals.length;
    const activeRentals = rentals.filter(r => r.paymentStatus === 'paid').length;
    const pendingPayments = rentals.filter(r => r.paymentStatus === 'pending').length;

    res.json({
      totalRentals,
      activeRentals,
      pendingPayments
    });
  } catch (err) {
    console.error('Overview Error:', err);
    res.status(500).json({ message: 'Server error while fetching overview' });
  }
};



