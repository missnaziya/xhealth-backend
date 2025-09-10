const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  mood: { type: String, required: true },
  is_active: { type: Boolean, default: true }, // New is_active field added
  // timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Mood', moodSchema);
