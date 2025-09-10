const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  id: String,
  name: String,
  image: String, // Base64 image string
  remark: Number,
});

const profileQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  meta: { type: String, required: true },
  options: [optionSchema],
  status: {type:Boolean , default:true},
  type: { type: String, enum:['text', 'checkbox'], default:'checkbox'},
  layout: {type: String,}
});

const ProfileQuestion = mongoose.model("ProfileQuestion", profileQuestionSchema);

module.exports = ProfileQuestion;
