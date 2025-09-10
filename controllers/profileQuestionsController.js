const ProfileQuestion = require("../models/profileQuestion");

exports.getProfileQuestions = async (req,res) =>{
    try{
      const questions = await ProfileQuestion.find();

        if(!questions){
            return res.status(404).json({success:false,message:"No question found"})
        }
      return res.status(200).json({success:true, questions})
    } catch(error){
      console.log("Error", error);
      
    }
}