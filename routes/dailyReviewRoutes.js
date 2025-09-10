const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { saveDailyReview } = require('../controllers/dailyReviewController');

const router = express.Router()

router.post('/add', authMiddleware, saveDailyReview )


module.exports = router;