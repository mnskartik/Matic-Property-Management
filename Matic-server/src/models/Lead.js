const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: String,
  status: { type: String, enum: ['pending','contacted','closed'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
