const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  month: String,
  totalRevenue: Number,
  totalProperties: Number,
  agentStats: [{ agentId: mongoose.Schema.Types.ObjectId, totalProperties: Number, revenue: Number }]
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
