const Property = require('../models/Property');

exports.getAll = async (req, res) => {
  // filter: only approved for public / tenants unless admin/agent requests
  const query = {};
  // allow admin/agent to see all if query param includeAll=true
  if (!req.user || (req.user && req.user.role === 'tenant')) {
    query.isApproved = true;
  } else if (req.query.includeAll === 'true') {
    // no filter
  } else {
    // agents/admins might want to see approved only by default
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
