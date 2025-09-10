const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const { getProfileQuestions } = require('../controllers/profileQuestionsController');

const router =  express.Router()

router.get('/all', authMiddleware , getProfileQuestions)

module.exports = router;