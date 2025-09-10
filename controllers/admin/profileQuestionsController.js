// const question = require("../../models/question");

const { Message } = require("twilio/lib/twiml/MessagingResponse");
const ProfileQuestion = require("../../models/profileQuestion");

// const getProfileQuestions = async (req, res) => {
//     try {
//         // Find the profile of the user by userId
//         const profiles = await question.find();
// console.log("profiles",profiles);

//         // If no profile is found, return an error response
//         if (!profiles) {
//             return res.status(404).json({ success: false, message: "Profile not found." });
//         }

//         // Send the profile data as the response
//         res.status(200).json({ success: true, profiles });
//     } catch (error) {
//         console.error("Error fetching profile:", error);
//         res.status(500).json({ success: false, error: "An error occurred while fetching the profile." });
//     }
// };


// const getContents = async (req, res) => {
//     try {
//         // Find the profile of the user by userId
//         const profiles = await question.find();
// console.log("profiles",profiles);

//         // If no profile is found, return an error response
//         if (!profiles) {
//             return res.status(404).json({ success: false, message: "Profile not found." });
//         }

//         // Send the profile data as the response
//         res.status(200).json({ success: true, profiles });
//     } catch (error) {
//         console.error("Error fetching profile:", error);
//         res.status(500).json({ success: false, error: "An error occurred while fetching the profile." });
//     }
// };
// module.exports = {getProfileQuestions}


// Create Profile Question
exports.createProfileQuestion = async (req, res) => {
  try {
    const { question, meta, options } = req.body;

    // if (!options || options.length === 0) {
    //   return res.status(400).json({ error: "Options are required." });
    // }

    // Calculate remark for each option
    const remarkValue = 100 / options.length;
    const updatedOptions = options.map((option, index) => ({
      ...option,
      id: `option-${index + 1}`, // Generate unique ID for each option
      remark: remarkValue.toFixed(2),
    }));

    const newProfileQuestion = new ProfileQuestion({
      question,
      meta,
      options: updatedOptions,
    });

    await newProfileQuestion.save();
    res.status(201).json(newProfileQuestion);
  } catch (error) {
    res.status(500).json({ error: "Failed to create profile question." });
  }
};

// Get All Profile Questions
exports.getProfileQuestions = async (req, res) => {
  try {
    const questions = await ProfileQuestion.find();
    return res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile questions." });
  }
};

// Update Profile Question
exports.updateProfileQuestion = async (req, res) => {
  try {
    // const { id } = req.params;
    const { id, question, meta, options,type,layout  } = req.body;

   
    // if (!options || options.length === 0) {
    //   return res.status(400).json({ error: "Options are required." });
    // }

    // Recalculate remark for each option
    const remarkValue = 100 / options.length;
    const updatedOptions = options.map((option, index) => ({
      ...option,
      id: `option-${index + 1}`,
      remark: remarkValue.toFixed(2),
    }));

    const updatedQuestion = await ProfileQuestion.findByIdAndUpdate(
      id,
      { question, meta, options: options,type, layout },
      // { question, meta, options: updatedOptions },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json();
    }

    res.status(200).json({ status:true,message: "Profile question updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile question." });
  }
};
