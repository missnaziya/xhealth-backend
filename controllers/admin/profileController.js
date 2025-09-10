const Profile = require("../../models/Profile");



const getAllProfile = async (req, res) => {
    try {
        // Find the profile of the user by userId
        const profiles = await Profile.find().
        populate('userId');

        // If no profile is found, return an error response
        if (!profiles) {
            return res.status(404).json({ success: false, message: "Profile not found." });
        }

        // Send the profile data as the response
      return   res.status(200).json({ success: true, profiles });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ success: false, error: "An error occurred while fetching the profile." });
    }
};

const getProfileById = async (req,res) =>{
    try{
        const {id} = req.params;
        console.log("id",id);
        
    const profile = await Profile.findOne({userId:id}).populate("category")
    if(!profile){
        return res.status(404).json({success:false, message:"Profile not found."})
    }

    return res.status(200).json({success:true,profile})
    } catch(error){
     console.log("Error", error);
     
    }

}

const updateProfile = async (req, res) => {
    // const {user_id} = req.query;

    try {
        const { ...fieldsToUpdate } = req.body;
        const { id } = req.body;



        // Validate userId
        if (!id) {
            return res.status(400).json({ error: "User ID is required." });
        }

        // Update the profile and return the updated document
        const updatedProfile = await Profile.findOneAndUpdate(
            { _id: id }, // Query to find the profile
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

const removeProfile = async (req, res) => {
    const { profile_id } = req.query;
    try {
  
        if (!profile_id) {
            return res.status(400).json({ error: "User ID is required." });
        }

        const removeProfile = await Profile.findByIdAndDelete(
            { _id: profile_id }, 
        );

        if (!removeProfile) {
            return res.status(404).json({ error: "Profile not found." });
        }
        res
            .status(200)
            .json({
                message: "Profile deleted successfully.",
                profile: removeProfile,
            });
    } catch (error) {
        console.error("Error updating profile:", error);
        res
            .status(500)
            .json({ error: "An error occurred while updating the profile." });
    }
};



module.exports = { getAllProfile, updateProfile, removeProfile, getProfileById }