const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: String,
  city: String,
  price: Number,
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isApproved: { type: Boolean, default: false },
  images: [String],
  amenities: [String],
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
