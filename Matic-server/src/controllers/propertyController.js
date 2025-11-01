const Property = require('../models/Property');

exports.getAll = async (req, res) => {
  const query = {};

  if (!req.user) {
    // Public users only see approved
    query.isApproved = true;
  } else if (req.user.role === 'tenant') {
    // Tenants only see approved
    query.isApproved = true;
  } else if (req.query.includeAll === 'true' && req.user.role === 'admin') {
    // Admin sees all
  } else if (req.user.role === 'agent') {
    // Agents see only their own properties
    query.agentId = req.user._id;
  }

  const props = await Property.find(query).populate('agentId', 'name email phone');
  res.json(props);
};

exports.getById = async (req, res) => {
  const p = await Property.findById(req.params.id).populate('agentId', 'name email phone');
  if (!p) return res.status(404).json({ message: 'Property not found' });
  if (!p.isApproved && (!req.user || req.user.role === 'tenant')) {
    return res.status(403).json({ message: 'Not allowed to view this property' });
  }
  res.json(p);
};

exports.create = async (req, res) => {
  // agent creates -> isApproved default false (pending)
  const data = req.body;
  data.agentId = req.user._id;
  const prop = await Property.create(data);
  res.status(201).json(prop);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  // agent can only update own property; admin can update any
  const prop = await Property.findById(id);
  if (!prop) return res.status(404).json({ message: 'Property not found' });

  if (req.user.role === 'agent' && !prop.agentId.equals(req.user._id)) {
    return res.status(403).json({ message: 'Not allowed to update this property' });
  }

  Object.assign(prop, updates);
  await prop.save();
  res.json(prop);
};

exports.remove = async (req, res) => {
  const id = req.params.id;
  const prop = await Property.findById(id);
  if (!prop) return res.status(404).json({ message: 'Property not found' });

  if (req.user.role === 'agent' && !prop.agentId.equals(req.user._id)) {
    return res.status(403).json({ message: 'Not allowed to delete this property' });
  }
  await prop.remove();
  res.json({ message: 'Property deleted' });
};


exports.toggleApproval = async (id, approved) => {
  const prop = await Property.findById(id);
  if (!prop) throw new Error("Property not found");
  prop.isApproved = approved;
  await prop.save();
  return { message: "Property approval updated", isApproved: prop.isApproved };
};

exports.getPublic = async (req, res) => {
  try {
    const props = await Property.find({ isApproved: true })
      .populate('agentId', 'name email phone');
    res.json(props);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};