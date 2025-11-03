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
  try {
    const data = req.body;
    data.agentId = req.user._id;
    data.images = req.files?.map((f) => `/uploads/${f.filename}`) || [];
    data.isApproved = false; // agent's new listing pending approval

    const prop = await Property.create(data);
    res.status(201).json(prop);
  } catch (err) {
    console.error("Create property error:", err);
    res.status(500).json({ message: "Error creating property", error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    const prop = await Property.findById(id);
    if (!prop) return res.status(404).json({ message: "Property not found" });

    // Only owner agent can update own property
    if (req.user.role === "agent" && !prop.agentId.equals(req.user._id)) {
      return res.status(403).json({ message: "Not allowed to update this property" });
    }

    // If new images uploaded, append them to existing ones
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((f) => `/uploads/${f.filename}`);
      prop.images = [...prop.images, ...newImages].slice(0, 5); // limit to 5
    }

    // Apply other updates (title, price, etc.)
    Object.assign(prop, updates);

    await prop.save();
    res.json(prop);
  } catch (err) {
    console.error("Update property error:", err);
    res.status(500).json({ message: "Error updating property", error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const prop = await Property.findById(id);
    if (!prop) return res.status(404).json({ message: "Property not found" });

    // Only allow owner agent or admin to delete
    if (req.user.role === "agent" && !prop.agentId.equals(req.user._id)) {
      return res.status(403).json({ message: "Not allowed to delete this property" });
    }

    // 🖼 Delete uploaded image files
    if (prop.images && prop.images.length > 0) {
      prop.images.forEach((imgPath) => {
        const fullPath = path.join(__dirname, "..", imgPath);
        if (fs.existsSync(fullPath)) {
          try {
            fs.unlinkSync(fullPath);
          } catch (err) {
            console.warn("Failed to delete image:", imgPath);
          }
        }
      });
    }

    // 🧾 Delete all leads linked to this property
    await Lead.deleteMany({ propertyId: id });

    // 📄 Delete any rental requests linked to this property
    await Rental.deleteMany({ propertyId: id });

    // 🏠 Finally, delete the property itself
    await Property.findByIdAndDelete(id);

    res.json({ message: "Property and all related data deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Error deleting property", error: err.message });
  }
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