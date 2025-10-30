const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  rentalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Rental', required: true },
  amount: Number,
  date: { type: Date, default: Date.now },
  method: { type: String, default: 'mock' },
  status: { type: String, enum: ['success','failed'], default: 'success' }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
