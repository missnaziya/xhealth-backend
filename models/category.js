const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    level: { type: Number, }, // Level 1, 2, 3, etc.
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
