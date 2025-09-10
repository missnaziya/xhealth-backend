const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  phoneLoginEnabled: { type: Boolean, default: false },  // Boolean flag to enable/disable phone login
  emailLoginEnabled : {type:Boolean, default: false},
  updatedAt: { type: Date, default: Date.now },  // Timestamp for when the settings were last updated
});

module.exports = mongoose.model('Settings', settingsSchema);

