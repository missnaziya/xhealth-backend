const Content = require('../models/content');
const UserCounsellingContent = require('../models/userCounsellingContent');

// Create a new question
const createQuestion = async (req, res) => {
    try {
        const { category, content,status, name } = req.body;
        console.log("content",content);

        const newQuestion = new Content({
            name,
            category,
            content,
            status
        });

        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (error) {
 return   res.status(500).json({ message: 'Error creating question', error });
    }
};

// Get all questions
const getAllQuestions = async (req, res) => {
    try {
        const questions = await Content.find().populate('category');
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions', error });
    }
};

// Get question by ID
//done
const getContent = async (req, res) => {
    try {
        const { id } = req.params;        
        // const data = await UserCounsellingContent.findOne({userId: req.id})
        const data = await Content.findOne({category: id})
        console.log("data", data);
        
        if (!data) {
            return res.status(404).json({success:false, message: 'content not found' });
        }
        res.status(200).json({success:true, counsellingContent: data});
    } catch (error) {
        res.status(500).json({ success:false, message: 'Error fetching content' });
    }
};

// Update question by ID
const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedQuestion = await Content.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!updatedQuestion) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(500).json({ message: 'Error updating question', error });
    }
};

// Delete question by ID
const deleteQuestion = async (req, res) => {    
    try {
        const { id } = req.params;

        const deletedQuestion = await Content.findByIdAndDelete(id);
        if (!deletedQuestion) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting question', error });
    }
};

module.exports = {
    createQuestion,
    getAllQuestions,
    getContent,
    updateQuestion,
    deleteQuestion,
};
