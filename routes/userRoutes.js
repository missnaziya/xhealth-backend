const express = require('express');
const router = express.Router();
const { getAllUsers, updateUser, verifyOtp, getUser } = require('../controllers/userController');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const {   deleteUser, getUserById } = require('../controllers/admin/userController');

// GET route to fetch all users (protected for admins)
// router.get('/',authMiddleware, adminMiddleware, getAllUsers);
// router.get('/:id',authMiddleware, adminMiddleware, getUserById);

router.get('/',authMiddleware, getUser);
router.put('/update',authMiddleware, updateUser );
router.post('/verify-otp', authMiddleware, verifyOtp);
router.delete('/remove',authMiddleware, adminMiddleware, deleteUser);


// admin

// router.put('/update',authMiddleware, adminMiddleware, updateUser );

module.exports = router;
