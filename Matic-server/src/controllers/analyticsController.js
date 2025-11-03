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


// GET /api/analytics/agent
exports.agentAnalytics = async (req, res) => {
  try {
    const agentId = req.user._id;

    // Count agent's own properties
    const totalProperties = await Property.countDocuments({ agentId });

    // Count approved ones
    const approvedProperties = await Property.countDocuments({
      agentId,
      isApproved: true,
    });

    // Count total inquiries (leads) for agent's properties
    const totalLeadsAgg = await Property.aggregate([
      { $match: { agentId } },
      {
        $lookup: {
          from: "leads",
          localField: "_id",
          foreignField: "propertyId",
          as: "leads",
        },
      },
      {
        $project: {
          leadCount: { $size: "$leads" },
        },
      },
      {
        $group: {
          _id: null,
          totalLeads: { $sum: "$leadCount" },
        },
      },
    ]);

    const totalLeads = totalLeadsAgg[0]?.totalLeads || 0;

    res.json({
      totalProperties,
      approvedProperties,
      totalLeads,
    });
  } catch (err) {
    console.error("Agent analytics error:", err);
    res.status(500).json({ message: "Server error fetching agent analytics" });
  }
};



