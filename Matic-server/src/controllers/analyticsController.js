const User = require('../models/User');
const Property = require('../models/Property');
const Payment = require('../models/Payment');

// GET /api/analytics/overview
exports.overview = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalAgents = await User.countDocuments({ role: 'agent' });
  const totalTenants = await User.countDocuments({ role: 'tenant' });
  const totalProperties = await Property.countDocuments();
  const approvedProperties = await Property.countDocuments({ isApproved: true });

  // revenue
  const revenueAgg = await Payment.aggregate([
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);
  const totalRevenue = revenueAgg[0]?.total || 0;

  // agent stats (basic): properties per agent
  const agentStats = await Property.aggregate([
    { $group: { _id: "$agentId", totalProperties: { $sum: 1 } } }
  ]);

  res.json({
    totalUsers,
    totalAgents,
    totalTenants,
    totalProperties,
    approvedProperties,
    totalRevenue,
    agentStats
  });
};
