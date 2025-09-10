const bcrypt = require("bcryptjs");
const { validateEmail, validatePhone } = require("../utils/validators"); // Validation utilities
const { sendOtpEmail, sendOtpPhone } = require("../utils/otpService");
const { generateOtp } = require("../utils/function");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile");
const ProfileQuestion = require("../models/profileQuestion");
const Category = require("../models/category");
const UserCounsellingContent = require("../models/userCounsellingContent");
const Content = require("../models/content");

// done
const profileSave = async (req, res) => {
  try {
    const { totalRemark, category, ...questions } = req.body;
    
    
    let questionFields = {};
    let totalMarks = 0;
    let count = 0;
    
    for (const [key, value] of Object.entries(questions)) {
      console.log("questions",key);
      if (!value || !value.question || !value.answer) {
        console.error(`Invalid question data for key: ${key}`, value);
        continue; // Skip invalid entries
      }
    
      
      questionFields[`${key}`] = {
      // questionFields[`Question${count + 1}`] = {
        question: value.question,
        answer: value.answer,
        remark:value.remark,
      };
      
      // const questionData = await ProfileQuestion.findOne({ "options.name": value.answer });
      // if (questionData) {
      //   const option = questionData.options.find(opt => opt.name === value.answer);
      //   if (option && typeof option.remark === "number") {
      //     totalMarks += option.remark;
      //   }
      // }
      count++;
    }
    
    const averageRemark = count > 0 ? totalRemark / count : 0;
    console.log("averageRemark",averageRemark);
    
    
    // let categoryId;
    // if (averageRemark <= 50) {
    //   categoryId = "678652ffe9a3cab87c873a0d"; // Weak
    // } else if (averageRemark <= 100) {
    //   categoryId = "678656b7e9a3cab87c873a12"; // Normal
    // } else if (averageRemark <= 150) {
    //   categoryId = "678656c0e9a3cab87c873a14"; // Strong
    // } else {
    //   categoryId = "678656c6e9a3cab87c873a16"; // Extreme
    // }
    
// **Find Suitable Category Dynamically Based on Level**
    // **Fetch Categories from DB, sorted by level**
    const categories = await Category.find({ status: "active" }).sort({ level : 1 });
    let categoryId = null;

    if (categories.length > 0) {
    // Sort categories by level (ascending) to ensure correct order
    categories.sort((a, b) => a.level - b.level);

  //   // Determine category dynamically
  //    for (const cat of categories) {
  //      if (averageRemark <= cat.level * 50) {  // Adjust range logic if needed
  //     categoryId = cat._id;
  //     break;
  //   }
  // }
  const maxMarks = 100; // 10 questions × 10 marks each
const numLevels = categories.length; // Total available levels
const levelFactor = maxMarks / numLevels; // Calculate the range dynamically

for (const cat of categories) {
  if (totalRemark <= cat.level * levelFactor) {
    console.log("cat", cat);
    
    categoryId = cat._id;
    break;
  }
}

  // If no category matched, assign the last category (highest level)
  if (!categoryId) {
    categoryId = categories[categories.length - 1]._id;
  }
}
console.log("working", categoryId, req.id);



// counsellng content start
// 📌 Fetch counseling content for the same category
const counsellingContent = await Content.findOne({ category: categoryId });


console.log("counsellingContent", counsellingContent);

if (counsellingContent) {
  console.log("log", req.id, categoryId, counsellingContent);

  // ✅ Create a deep copy of the content to remove unwanted fields
  const copiedContent = JSON.parse(JSON.stringify(counsellingContent)); 

  // ✅ Remove `_id` from copied content
  delete copiedContent._id; 
  copiedContent.content.forEach((item) => {
      delete item._id; 
      item.plan.forEach((planItem) => delete planItem._id);
  });



  await UserCounsellingContent.findOneAndUpdate(
    { userId: req.id }, // Find by userId
    { 
      $set: { 
        category: categoryId,
        name: copiedContent.name,
        content: copiedContent.content,
        status: "active"
      } 
    },
    { upsert: true, new: true } // Create if not found, return the updated document
  );
  
}
// counsellng content end

  let profile;

    let existingProfile = await Profile.findOne({ userId: req.id });
    
    if (existingProfile) {
   
      
      profile= await Profile.findOneAndUpdate({ userId: req.id }, { 
        $set: { ...questionFields, totalRemark: averageRemark, category: categoryId } 
      });
    } else {
    
      profile= await Profile.create({
        userId: req.id,
        ...questionFields,
        totalRemark: averageRemark,
        category: categoryId,
      });
    }
    var size = Object.keys(questions).length;
      console.log("Size", size);
      
    if(size == 10){
      console.log("true", typeof(size));
      
    const update =  await User.updateOne(
        { _id: req.id },
        { $set: { isProfileQuestions: true } }
      );
      console.log("true....");
    }

    return  res.status(201).json({ success: true, message: "Profile saved successfully.", profile });
  } catch (error) {
    console.error("Error saving profile:", error);
    res.status(500).json({ error: "An error occurred while saving the profile." });
  }
};
// const profileSave = async (req, res) => {
//   // Save Profile API
//   try {
//     const { gender, nickname, religion, mood, emotion, feeling, goal, experience, trauma, religious } = req.body;

//     // Validate required fields
//     if (!gender || !nickname || !religion || !mood || !emotion || !feeling || !goal || !experience || !trauma) {
//       return res.status(400).json({ error: "All fields are required." });
//     }

//     // Check if the profile already exists for this userId
//     const existingProfile = await Profile.findOne({ userId: req.id });

//     // uncomment this
//     // if (existingProfile) {
//     //   // If a profile already exists, return a message to inform the user
//     //   return res
//     //     .status(400)
//     //     .json({ message: "Profile already created for this user." });
//     // }

//     // Create a new profile instance


//     // **Fix: Properly query for remark values including gender**
//     let totalRemark = 0;
//     let count = 0; // Count valid remarks
//     const fields = { gender, emotion, experience, feeling, goal, mood, trauma };

//     for (const [key, value] of Object.entries(fields)) {
//       const question = await ProfileQuestion.findOne({
//         "options.name": value
//       });

//       if (question) {
//         const option = question.options.find(opt => opt.name === value);
//         if (option && typeof option.remark === "number") {
//           console.log("option", option.name);

//           totalRemark += option.remark; // Accumulate the total remark
//           count++
//         }
//       }
//     }

//     //  calculate average
//     const averageRemark = count > 0 ? totalRemark / count : 0;
//     totalRemark = averageRemark;



//     //  category assign
//     // **Fetch categories from the database**
//     const categories = await category.find({ status: "active" });

//     // **Determine categoryId based on totalRemark**
//     let categoryId;
//     if (totalRemark <= 50) {
//       categoryId = "678652ffe9a3cab87c873a0d"; // Weak
//     } else if (totalRemark <= 100) {
//       categoryId = "678656b7e9a3cab87c873a12"; // Normal
//     } else if (totalRemark <= 150) {
//       categoryId = "678656c0e9a3cab87c873a14"; // Strong
//     } else {
//       categoryId = "678656c6e9a3cab87c873a16"; // Extreme
//     }

//     console.log("req.user.id,", req.id);

//     const newProfile = new Profile({
//       userId: req.id,
//       gender,
//       nickname,
//       religion,
//       mood,
//       emotion,
//       feeling,
//       goal,
//       experience,
//       trauma,
//       religious,
//       totalRemark,
//       category: categoryId,
//       // isProfileQuestions:true,
//     });

//     // Save the profile to the database
//     const savedProfile = await newProfile.save();


//     // Update the user collection to set isProfileQuestions to true
//     const updateResponse = await User.updateOne(
//       { _id: req.id },
//       { $set: { isProfileQuestions: true } }
//     );



//     // Send success response
//     res
//       .status(201)
//       .json({ message: "Profile saved successfully.", profile: savedProfile });
//   } catch (error) {
//     console.error("Error saving profile:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while saving the profile." });
//   }
// };

const updateProfile = async (req, res) => {
  const userId = req.id;

  try {
    const { ...fieldsToUpdate } = req.body;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    // Update the profile and return the updated document
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId }, // Query to find the profile
      { $set: fieldsToUpdate }, // Update only provided fields
      { new: true } // Return the updated document
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: "Profile not found." });
    }
    // Send success response
    res
      .status(200)
      .json({
        message: "Profile updated successfully.",
        profile: updatedProfile,
      });
  } catch (error) {
    console.error("Error updating profile:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the profile." });
  }
};


const getProfile = async (req, res) => {
  try {
    // Find the profile of the user by userId
    // const profile = await Profile.findOne({ userId: req.id });
    const profile = await Profile.findOne({ userId: req.id });
    // If no profile is found, return an error response
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found." });
    }
    // Send the profile data as the response
    res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ success: false, error: "An error occurred while fetching the profile." });
  }
};




module.exports = { profileSave, updateProfile, getProfile };
