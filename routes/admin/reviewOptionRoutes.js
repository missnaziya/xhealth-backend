const express = require('express');
const adminMiddleware = require('../../middleware/adminMiddleware');
const authMiddleware = require('../../middleware/authMiddleware');
const { createReviewOption, getAllReviewOptions, getReviewOptionById, updateReviewOption, deleteReviewOption } = require('../../controllers/admin/reviewOptionController');
const router = express.Router();
// 🔹 API Routes


router.post('/', authMiddleware, adminMiddleware, createReviewOption);
router.get('/', authMiddleware, adminMiddleware, getAllReviewOptions);
router.get('/:id', authMiddleware, adminMiddleware, getReviewOptionById);
router.put('/update', authMiddleware, adminMiddleware, updateReviewOption);
router.delete('/:id', authMiddleware, adminMiddleware, deleteReviewOption);
// router.get()

module.exports = router;