
const express = require('express');
// const { getProfileQuestions } = require('../../controllers/admin/profileQuestionsController');
const adminMiddleware = require('../../middleware/adminMiddleware');
const authMiddleware = require('../../middleware/authMiddleware');
const { getContents, updateContent, deleteContent, addContent } = require('../../controllers/admin/contentController');

const router = express.Router();

// router.get('/',authMiddleware, getProfile);
// router.post('/save',authMiddleware, profileSave);
router.post('/add',authMiddleware, addContent); // Create a new question
router.put('/update/:id',authMiddleware,adminMiddleware, updateContent);
router.get('/',authMiddleware,adminMiddleware, getContents);
router.delete('/remove/:id',authMiddleware,adminMiddleware, deleteContent);



module.exports = router;