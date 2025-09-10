const express = require('express');
const { createQuestion, getAllQuestions, getQuestionById, updateQuestion, deleteQuestion } = require('../controllers/questionController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();




// Routes for CRUD operations
router.post('/add',authMiddleware, createQuestion); // Create a new question
router.get('/', authMiddleware, getAllQuestions); // Get all questions
router.get('/:id', authMiddleware, getQuestionById); // Get question by ID
router.put('/:id', authMiddleware, updateQuestion); // Update question by ID
router.delete('/:id', authMiddleware, deleteQuestion); // Delete question by ID

module.exports = router;

