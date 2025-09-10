const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getAllReviewOptions } = require('../controllers/reviewOptionController');
const router = express.Router()

router.get('/all', authMiddleware, getAllReviewOptions )


module.exports = router;