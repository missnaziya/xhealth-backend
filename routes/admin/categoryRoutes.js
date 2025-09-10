const express = require('express');
const Category = require('../../models/category');
const { addCategory, getCategories, updateCategory, getCategory, deleteCategory } = require('../../controllers/admin/categoryController');
const adminMiddleware = require('../../middleware/adminMiddleware');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();

// Get all categories
router.get('/',authMiddleware, adminMiddleware, getCategories);


// get category by id 
router.get('/:id',authMiddleware, adminMiddleware, getCategory);


// Add a new category
router.post('/add',authMiddleware, adminMiddleware, addCategory );
// router.get('/',authMiddleware, adminMiddleware, getAllUsers);



// Update category
router.put('/update',authMiddleware, adminMiddleware,updateCategory);


// Delete category
// router.delete('/remove', async (req, res) => {
//     try {
//         const { category_id } = req.query;
        
//         // Validate if category_id is provided
//         if (!category_id) {
//             return res.status(400).json({ error: 'Category ID is required' });
//         }
        

        
//         // Find and delete the category
//         const category = await Category.findByIdAndDelete({_id:category_id});

//         // Check if the category was found and deleted
//         if (!category) {
//             return res.status(404).json({ error: 'Category not found' });
//         }

//         // Return success message
//         res.status(200).json({ message: 'Category deleted successfully' });
//     } catch (error) {
//         // Handle any unexpected errors
//         console.error("Error deleting category:", error);
//         res.status(500).json({ error: 'Failed to delete category. Please try again.' });
//     }
// });

router.delete('/remove',authMiddleware,adminMiddleware,deleteCategory)


module.exports = router;
