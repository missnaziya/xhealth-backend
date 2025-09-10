const express = require('express');
const Category = require('../models/category');
const router = express.Router();

// Add a new category
router.post('/add', async (req, res) => {
    try {
        const { name, status } = req.body;
        const category = new Category({ name, status });
        await category.save();
        res.status(201).json({ message: 'Category added successfully', category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update category
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(id, { name, status }, { new: true });
        res.status(200).json({ message: 'Category updated successfully', updatedCategory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// // Delete category
// router.delete('/remove', async (req, res) => {
//     try {
//         console.log(req);        
//         const { category_id } = req.params.query;
//         await Category.findByIdAndDelete({id:category_id});
//         res.status(200).json({ message: 'Category deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

module.exports = router;
