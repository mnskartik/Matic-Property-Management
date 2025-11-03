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

// Tenant - view own leads

exports.getTenantLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ tenantId: req.user._id })
      .populate("propertyId");

    // Clean up orphaned leads (where property no longer exists)
    const validLeads = leads.filter((l) => l.propertyId !== null);

    // Optional: if you want to *delete* them permanently:
    const orphanIds = leads
      .filter((l) => l.propertyId === null)
      .map((l) => l._id);
    if (orphanIds.length > 0) await Lead.deleteMany({ _id: { $in: orphanIds } });

    res.json(validLeads);
  } catch (err) {
    res.status(500).json({ message: "Error fetching leads", error: err.message });
  }
};

// Tenant - update their enquiry
exports.updateLead = async (req, res) => {
  const lead = await Lead.findOne({ _id: req.params.id, tenantId: req.user._id });
  if (!lead) return res.status(404).json({ message: 'Lead not found' });

  lead.message = req.body.message || lead.message;
  await lead.save();
  res.json({ message: 'Lead updated successfully', lead });
};

// Tenant - delete their enquiry
exports.deleteLead = async (req, res) => {
  const lead = await Lead.findOneAndDelete({
    _id: req.params.id,
    tenantId: req.user._id,
  });
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  res.json({ message: 'Lead deleted successfully' });
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



// Agent replies to a tenant's approved lead
exports.replyToLead = async (req, res) => {
  try {
    const { message } = req.body;
    const lead = await Lead.findById(req.params.id).populate("propertyId");

    if (!lead) return res.status(404).json({ message: "Lead not found" });

    // ensure this lead belongs to the agent
    if (lead.propertyId.agentId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to reply to this lead" });
    }

    // ✅ allow reply only to contacted or closed leads
    if (!["contacted", "closed"].includes(lead.status)) {
      return res.status(400).json({ message: "Lead not contacted or closed yet" });
    }

    lead.replies.push({
      sender: "agent",
      text: message,
      date: new Date(),
    });

    await lead.save();
    res.json({ message: "Reply sent successfully", lead });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending reply" });
  }
};

exports.updateLeadStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["contacted", "closed", "pending"].includes(status))
    return res.status(400).json({ message: "Invalid status" });

  const lead = await Lead.findById(id).populate("propertyId");
  if (!lead) return res.status(404).json({ message: "Lead not found" });

  if (lead.propertyId.agentId.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Not authorized to modify this lead" });

  lead.status = status;
  await lead.save();

  res.json({ message: "Lead status updated", lead });
};
