const User = require('../models/User');

// GET /api/users   (admin only)
exports.getAll = async (req, res) => {
  const users = await User.find().select('-passwordHash');
  res.json(users);
};

// PUT /api/users/:id/status  (admin only)
exports.updateStatus = async (req, res) => {
  const id = req.params.id;
  const { isActive } = req.body;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.isActive = !!isActive;
  await user.save();
  res.json({ message: 'Status updated', user: { id: user._id, isActive: user.isActive } });
};
