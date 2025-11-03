const Rental = require('../models/RentalReq');
const Property = require('../models/Property');

// Tenant requests rental (for simplification we create rental record)
exports.createRental = async (req, res) => {
  try {
    const { propertyId } = req.body;

    const property = await Property.findById(propertyId);
    if (!property || !property.isApproved)
      return res.status(400).json({ message: 'Property not available' });

    // Auto-generate startDate = now and endDate = 30 days later
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 30);

    // Default rentAmount = 25000
    const rentAmount = 25000;

    const rental = await Rental.create({
      propertyId,
      tenantId: req.user._id,
      startDate,
      endDate,
      rentAmount,
      paymentStatus: 'pending',
    });

    res.status(201).json(rental);
  } catch (err) {
    console.error('Error creating rental:', err);
    res.status(500).json({ message: 'Server error while creating rental' });
  }
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

  console.log("Agent:", req.user._id);
console.log("Agent properties:", props);

};




// Tenant Dashboard Overview
exports.getTenantOverview = async (req, res) => {
  try {
    const tenantId = req.user._id;

    // Fetch rentals for this tenant
    const rentals = await Rental.find({ tenantId });

    const activeRentals = rentals.filter(r => r.paymentStatus === "paid").length;

    // Calculate total amount paid (sum of payments)
    const payments = await Payment.aggregate([
      { $match: { tenantId } },
      { $group: { _id: null, totalPaid: { $sum: "$amount" } } },
    ]);
    const totalPaid = payments[0]?.totalPaid || 0;

    // Calculate next due date (if any pending rental exists)
    const nextDueRental = rentals.find(r => r.paymentStatus === "pending");
    const nextDue = nextDueRental
      ? new Date(nextDueRental.endDate).toLocaleDateString()
      : "N/A";

    res.json({ activeRentals, totalPaid, nextDue });
  } catch (err) {
    console.error("Tenant overview error:", err);
    res.status(500).json({ message: "Error fetching tenant overview" });
  }
};



exports.updateRentalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    const rental = await Rental.findById(id).populate('propertyId');
    if (!rental) return res.status(404).json({ message: 'Rental not found' });

    // Only allow the agent who owns the property (or admin)
    if (
      req.user.role === 'agent' &&
      rental.propertyId.agentId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    rental.paymentStatus = paymentStatus;
    await rental.save();

    res.json({ message: 'Rental updated', rental });
  } catch (err) {
    console.error('Error updating rental:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
