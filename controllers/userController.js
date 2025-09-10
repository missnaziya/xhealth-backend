const { default: mongoose } = require('mongoose');
const Profile = require('../models/Profile');
const User = require('../models/User'); // Assuming you have a User model
const userCounsellingContent = require('../models/userCounsellingContent');
const { generateOtp } = require('../utils/function');
const { sendOtpEmail, sendOtpPhone } = require('../utils/otpService');



// const getAllUsers = async (req, res) => {
//   try {
//     const { search, sortBy, order } = req.query; // Get query parameters

//     let filter = { role: "user" }; // Default filter to fetch only users

//     if (search) {
//       filter.$or = [
//         { name: { $regex: search, $options: "i" } },   // Search by name (case-insensitive)
//         { email: { $regex: search, $options: "i" } },  // Search by email (case-insensitive)
//         { phone: { $regex: search, $options: "i" } },  // Search by phone (case-insensitive)
//         // { date: { $regex: search, $options: "i" } }    // Search by date (case-insensitive)
//       ];
//     }
    
//     let users;

//     if(sortBy == "email"){
//        users = await User.find({ email: { $ne: undefined } }).lean()
//            console.log("users",users,"users");
           
//     }
//     else if(sortBy == "phone"){
//        users = await User.find({ phone: { $ne: undefined } }).lean()
//            console.log("users",users,"users");
           
//     }

//     else{

      
//       let sortOptions = {};
//       if (sortBy) {
//         sortOptions[sortBy] = order === "desc" ? -1 : 1;
//       }
      
//       // Fetch users
//        users = await User.find(filter).sort(sortOptions).lean(); // Use .lean() for better performance
//     }

//     // Get user IDs
//     const userIds = users.map((user) => user._id);

//     // Fetch corresponding profiles
//     const profiles = await Profile.find({ userId: { $in: userIds } }).lean();

//     // Attach profile data to users
//     const usersWithProfiles = users.map((user) => {
//       const userProfile = profiles.find((profile) => String(profile.userId) === String(user._id)) || null;
//       return { ...user, profile: userProfile };
//     });

//     return res.status(200).json({ success: true, users: usersWithProfiles });
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ success: false, message: "Server Error", error });
//   }
// };

const getAllUsers = async (req, res) => {
  try {
    const { search, sortBy, order } = req.query;

    // Default filter to fetch only users
    let filter = { role: "user" };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } }
      ];
    }

    // Ensure fields are not null or undefined
    if (sortBy && ["email", "phone", "name"].includes(sortBy)) {
      filter[sortBy] = { $ne: null };
    }
    
    // Construct sorting options dynamically
    let sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = order === "desc" ? -1 : 1;
    }

    // Fetch users with sorting applied
    let users = await User.find(filter).sort(sortOptions).lean();

    // Get user IDs in a single step
    const userIds = users.map((user) => user._id);

    // Fetch corresponding profiles efficiently
    const profilesMap = new Map(
      (await Profile.find({ userId: { $in: userIds } }).lean()).map(profile => [String(profile.userId), profile])
    );
    console.log("profilesMap", profilesMap);
    const userObjectIds = userIds.map(id => new mongoose.Types.ObjectId(id));
    console.log("userObjectIds", userObjectIds);
    

    const counselingContentMap = new Map(
      (await userCounsellingContent.find().lean()).map(content => [content.userId.toString(), content])
    );
    
    console.log("counselingContentMap", counselingContentMap);
    
    const usersWithProfiles = users.map(user => ({
      ...user,
      profile: profilesMap.get(String(user._id)) || null,
      counselingContent: counselingContentMap.get(String(user._id)) || null
    }));
    
    return res.status(200).json({ success: true, users: usersWithProfiles });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};


const updateUser = async (req, res) => {
  const { email, phone, country_code, profileImage, ...restData } = req.body; // Extract email and phone from request body
  const userId = req.id; // Assuming user ID is in `req.id`

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if email is different
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ success: false, message: 'Email is already in use.' });
      }

      // const emailOtp = Math.floor(1000 + Math.random() * 9000); // Generate OTP
      const emailOtp = generateOtp();


      await sendOtpEmail(email, emailOtp); // Send OTP to new email
      user.email_otp = emailOtp; // Save OTP in the database
      user.new_email = email; // Save OTP in the database
    }

    // Check if phone is different
    if (phone && phone !== user.phone || country_code !== user.country_code) {
      const phoneExists = await User.findOne({ phone });
      if (phoneExists) {
        return res.status(400).json({ success: false, message: 'Phone number is already in use.' });
      }
      // const phoneOtp = Math.floor(1000 + Math.random() * 9000); // Generate OTP
      const phoneOtp = generateOtp();

      await sendOtpPhone(phoneOtp, phone, country_code); // Send OTP to new phone
      user.phone_otp = phoneOtp; // Save OTP in the database
      if (country_code !== user.country_code) {
        user.new_country_code = country_code; // Save OTP in the database
      }
      user.new_phone = phone; // Save OTP in the database
    }

    // Handle Base64 profile image
    if (profileImage) {
      // Ensure the Base64 string is valid and starts with "data:image/"
      if (!/^data:image\/[a-zA-Z]+;base64,/.test(profileImage)) {
        return res.status(400).json({ success: false, message: "Invalid image format." });
      }
      user.profile_image = profileImage; // Save Base64 string to the database
    }


    // Update other user details
    Object.assign(user, restData);

    await user.save();

    res.status(200).json({
      success: true,
      message: 'User updated successfully. Please verify your new email or phone.',
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};



const verifyOtp = async (req, res) => {
  const { otp, type } = req.body; // `type` can be 'email' or 'phone'
  const userId = req.id; // Assuming user ID is in `req.id`


  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (type === 'email' && otp === user.email_otp) {
      user.email = user.new_email; // Update email
      user.new_email = undefined; // Clear temporary email
      user.email_otp = undefined; // Clear OTP
    } else if (type === 'phone' && otp === user.phone_otp) {
      user.country_code = user.new_country_code; // Update phone
      user.phone = user.new_phone; // Update phone
      user.new_country_code = undefined; // Clear temporary phone
      user.new_phone = undefined; // Clear temporary phone
      user.phone_otp = undefined; // Clear OTP
    } else {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    await user.save();

    res.status(200).json({ success: true, message: 'OTP verified and updated successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


const getUser = async (req, res) => {
  const userId = req.id; // Assuming `req.id` contains the authenticated user's ID

  try {
    // Find the user by their ID
    const user = await User.findById(userId).select("-password -token"); // Exclude sensitive fields like password

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Send user data as a response
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



module.exports = { getAllUsers, updateUser, verifyOtp, getUser };
