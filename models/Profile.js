const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  question1: {
    question: { type: String, },
    answer: { type: mongoose.Schema.Types.Mixed,},
    remark: { type: mongoose.Schema.Types.Mixed,}
  },
  question2: {
    question: { type: String, },
    answer: { type: mongoose.Schema.Types.Mixed, },
    remark: { type: mongoose.Schema.Types.Mixed,}
  },
  question3: {
    question: { type: String, },
    answer: { type: mongoose.Schema.Types.Mixed, },
    remark: { type: mongoose.Schema.Types.Mixed,}
  },
  question4: {
    question: { type: String, },
    answer: { type: mongoose.Schema.Types.Mixed, },
    remark: { type: mongoose.Schema.Types.Mixed,}
  },
  question5: {
    question: { type: String, },
    answer: { type: mongoose.Schema.Types.Mixed, },
    remark: { type: mongoose.Schema.Types.Mixed,}
  },
  question6: {
    question: { type: String, },
    answer: { type: mongoose.Schema.Types.Mixed, },
    remark: { type: mongoose.Schema.Types.Mixed,}
  },
  question7: {
    question: { type: String, },
    answer: { type: mongoose.Schema.Types.Mixed, },
    remark: { type: mongoose.Schema.Types.Mixed,}
  },
  question8: {
    question: { type: String, },
    answer: { type: mongoose.Schema.Types.Mixed, },
    remark: { type: mongoose.Schema.Types.Mixed,}
  },
  question9: {
    question: { type: String, },
    answer: { type: mongoose.Schema.Types.Mixed, },
    remark: { type: mongoose.Schema.Types.Mixed,}
  },
  question10: {
    question: { type: String, },
    answer: { type: mongoose.Schema.Types.Mixed, },
    remark: { type: mongoose.Schema.Types.Mixed,}
  },
  totalRemark: { type: Number },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Reference to Category
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);







// const mongoose = require('mongoose');

// const profileSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   gender: { type: String, enum: ['Male', 'Female', 'Other']},
//   nickname: { type: String },
//   religion: { type: String },
//   mood: { type: String },
//   emotion: { type: String },
//   feeling: { type: String },
//   goal: { type: String },
//   experience: { type: String },
//   trauma: { type: String },
//   religious: { type: Boolean },
//   totalRemark:{ type: Number},
//   category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Reference to Category
//   // timestamp: { type: Date, default: Date.now },

//   // total remark
// }, { timestamps: true });

// module.exports = mongoose.model('Profile', profileSchema);
