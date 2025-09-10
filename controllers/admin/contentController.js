const question = require("../../models/question");
const contents = require("../../models/content")




const getContents = async (req, res) => {
    try {
        // Find the profile of the user by userId
        const counsellingData = await contents.find();

        // If no profile is found, return an error response
        if (!counsellingData) {
            return res.status(404).json({ success: false, message: "Profile not found." });
        }

        // Send the profile data as the response
        res.status(200).json({ success: true, counsellingData });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ success: false, error: "An error occurred while fetching the profile." });
    }
};



const updateContent = async (req, res) => {
    try {
        const { id } = req.params; // Extract content ID from request parameters
        console.log("id," , id);
        
        const updateData = req.body; // Data to update

        // Find content by ID and update it
        const updatedContent = await contents.findByIdAndUpdate(id, updateData, { new: true });

        // If content not found, return an error
        if (!updatedContent) {
            return res.status(404).json({ success: false, message: "Content not found." });
        }

        // Send success response
        res.status(200).json({ success: true, message: "Content updated successfully.", content: updatedContent });
    } catch (error) {
        console.error("Error updating content:", error);
        res.status(500).json({ success: false, message: "An error occurred while updating the content." });
    }
};

// Add new content
const addContent = async (req, res) => {
    // try {
    //     const newContent = new Content(req.body);
    //     await newContent.save();
    //     res.status(201).json({ success: true, message: "Content added successfully.", content: newContent });
    // } catch (error) {
    //     console.error("Error adding content:", error);
    //     res.status(500).json({ success: false, message: "An error occurred while adding content." });
    // }
      try {
            const { category, content,status, name } = req.body;
            console.log("content",content);
            
                    if(!name){
                        return res.status(400).json({success:false, message:"Name is required."})
                    }
                    if(!category){
                        return res.status(400).json({success:false, message:"category is Required"})
                    }
                    if(!content){
                        return res.status(400).json({success:false,message:"Added at least one day content."})
                    }
                    
            
    
            const newQuestion = new contents({
                name,
                category,
                content,
                status
            });
    
            const savedQuestion = await newQuestion.save();
          return  res.status(201).json(savedQuestion);
        } catch (error) {
          return  res.status(500).json({ message: 'Error creating question', error });
        }
};



// Delete content
const deleteContent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedContent = await contents.findByIdAndDelete(id);
        if (!deletedContent) {
            return res.status(404).json({ success: false, message: "Content not found." });
        }
       return  res.status(200).json({ success: true, message: "Content deleted successfully." });
    } catch (error) {
        console.error("Error deleting content:", error);
     return   res.status(500).json({ success: false, message: "An error occurred while deleting content." });
    }
};


module.exports = {getContents,updateContent, deleteContent, addContent}