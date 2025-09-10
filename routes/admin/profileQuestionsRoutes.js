
const express = require('express');
const { getProfileQuestions, createProfileQuestion, updateProfileQuestion } = require('../../controllers/admin/profileQuestionsController');
const adminMiddleware = require('../../middleware/adminMiddleware');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

// router.get('/',authMiddleware, getProfile);
// router.post('/save',authMiddleware, profileSave);
// router.delete('/remove',authMiddleware,adminMiddleware, removeProfile);
// router.put('/update',authMiddleware,adminMiddleware, updateProfile);


// router.get('/',authMiddleware, getProfileQuestions);
// Route for creating a profile question
router.post("/add",authMiddleware,adminMiddleware, createProfileQuestion);

// Route for getting all profile questions
router.get("/all",authMiddleware,adminMiddleware, getProfileQuestions);

// Route for updating a profile question by ID
router.put("/update",authMiddleware,adminMiddleware, updateProfileQuestion);


module.exports = router;

