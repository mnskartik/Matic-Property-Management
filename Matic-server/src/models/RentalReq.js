const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: Date,
  endDate: Date,
  rentAmount: Number,
  paymentStatus: { type: String, enum: ['pending','paid','overdue'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Rental', rentalSchema);
