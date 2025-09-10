const Category = require("../../models/category")



const  addCategory =  async (req, res) => {  
    try {
        const { name, status, level } = req.body;

         if(!name){
            return res.status(404).json({success:false, message:"Category name is required."})
         }

   // Check if a category with the same name and active status already exists
   const existingCategory = await Category.findOne({ name, status: "active",   });

   if (existingCategory ) {
     return res.status(400).json({ success: false, message: "Category with this name already exists and is active." });
    }
    // Check if a category with the same level and active status already exists
    const existingLevel = await Category.findOne({ level, status: "active", });
    if (existingLevel) {
 return res.status(400).json({ success: false, message: "Category with this level already exists and is active." });
  }

        const category = new Category({ name, status, level });
        await category.save();
        res.status(201).json({ status: true, message: 'Category added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({success:true, data:categories});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const categories = await Category.find({_id: id });
        res.status(200).json({success:true, data:categories});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateCategory =  async (req, res) => {
    try {
        // const { id } = req.params;
        const { id, name, status,level } = req.body;

      if(!name){
        return  res.status(404).json({success:false, message:"Category name is required."})
      }
           // Check if a category with the same name and active status already exists
           const existingCategory = await Category.findOne({ name, status: "active", _id: { $ne: id }  });

           if (existingCategory ) {
             return res.status(400).json({ success: false, message: "Category with this name already exists and is active." });
            }
            // Check if a category with the same level and active status already exists
            const existingLevel = await Category.findOne({ level, status: "active", _id: { $ne: id }  });
            if (existingLevel) {
         return res.status(400).json({ success: false, message: "Category with this level already exists and is active." });
          }

        const updatedCategory = await Category.findByIdAndUpdate(id, { name, status,level }, { new: true });
        res.status(200).json({ message: 'Category updated successfully', updatedCategory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteCategory =  async (req, res) => {
        try {
            const { category_id } = req.query;
            
            // Validate if category_id is provided
            if (!category_id) {
                return res.status(400).json({ error: 'Category ID is required' });
            }
            
    
            
            // Find and delete the category
            const category = await Category.findByIdAndDelete({_id:category_id});
    
            // Check if the category was found and deleted
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
    
            // Return success message
            res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            // Handle any unexpected errors
            console.error("Error deleting category:", error);
            res.status(500).json({ error: 'Failed to delete category. Please try again.' });
        }
}


module.exports = {addCategory,getCategories,updateCategory , getCategory, deleteCategory}