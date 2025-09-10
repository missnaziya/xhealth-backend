const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, },
  email: { type: String, unique: true,sparse: true },
  password: { type: String },
  phone: { type: String,},
  phone_otp: { type: String }, // store OTP for phone-based signup/signin
  email_otp: { type: String }, // store OTP for password update 
  preferred_language: { type: String, default: "English" }, 
  device_token: { type: String },
  device_id: { type: String },
  signin_type: { type: String, enum: ["email", "phone", "social"], default: "email" },
  social_id: { type: String }, // store social media user id if using social login
  token: { type: String },
  isVerified: { type: Boolean, default: false }, // phone verification status
  role: { type: String, enum: ["admin", "user"], default: "user" },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  new_email: { type: String }, // store new email until it is verified
  new_phone: { type: String }, // store new phone until it is verified
  new_country_code: { type: String }, // store new phone until it is verified
  country_code: { type: String }, // store new phone until it is verified
  profile_image: { type: String }, 
  isProfileQuestions: { type: Boolean, default:false },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Reference to Category


  // task day 1
  //is  com

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

