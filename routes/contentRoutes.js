const express = require('express');
const { createQuestion, getAllQuestions, getContent } = require('../controllers/contentController');
const { updateQuestion } = require('../controllers/questionController');
const authMiddleware = require('../middleware/authMiddleware');



const router = express.Router();

// Routes for CRUD operations
router.get('/:id',authMiddleware, getContent); // Get question by ID
router.post('/add',authMiddleware, createQuestion); // Create a new question
router.get('/',authMiddleware, getAllQuestions); // Get all questions
router.put('/:id',authMiddleware, updateQuestion); // Update question by ID
// router.delete('/:id', deleteQuestion); // Delete question by ID

module.exports = router;

