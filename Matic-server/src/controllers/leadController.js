const Lead = require('../models/Lead');
const Property = require('../models/Property');

// Tenant creates lead
exports.createLead = async (req, res) => {
  const { propertyId, message } = req.body;
  const property = await Property.findById(propertyId);
  if (!property || !property.isApproved) return res.status(400).json({ message: 'Invalid or unapproved property' });

  const lead = await Lead.create({ propertyId, tenantId: req.user._id, message });
  res.status(201).json(lead);
};

// Agent views leads for their properties
exports.getLeadsForAgent = async (req, res) => {
  // find properties by agent
  const props = await Property.find({ agentId: req.user._id }).select('_id');
  const propIds = props.map(p => p._id);
  const leads = await Lead.find({ propertyId: { $in: propIds } }).populate('tenantId','name email phone').populate('propertyId','title city');
  res.json(leads);
};

// Admin can view all leads
exports.getAllLeads = async (req, res) => {
  const leads = await Lead.find().populate('tenantId','name email').populate('propertyId','title agentId');
  res.json(leads);
};
