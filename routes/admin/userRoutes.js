const express = require('express');
const router = express.Router();
// const { getAllUsers } = require('../controllers/userController');
const { getAllUsers } = require('../../controllers/userController');
// const adminMiddleware = require('../middleware/adminMiddleware');
const adminMiddleware = require('../../middleware/adminMiddleware');
const authMiddleware = require('../../middleware/authMiddleware');
const { getUserById, updateUser, deleteUser } = require('../../controllers/admin/userController');

// GET route to fetch all users (protected for admins)
router.get('/',authMiddleware, adminMiddleware, getAllUsers);
router.get('/:id',authMiddleware, adminMiddleware, getUserById);
router.put('/update',authMiddleware, adminMiddleware, updateUser);
router.delete('/remove',authMiddleware, adminMiddleware, deleteUser );
// router.delete('/remove', deleteUser );


module.exports = router;
