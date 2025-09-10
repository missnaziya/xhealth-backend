const express = require('express');
const { signup, signinWithEmailPassword } = require('../../controllers/admin/authController');
const adminMiddleware = require('../../middleware/adminMiddleware');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/signup',authMiddleware, adminMiddleware, signup);
router.post('/signin',authMiddleware, adminMiddleware, signinWithEmailPassword);





module.exports = router;
