const ReviewOption = require("../../models/reviewOption");

// ✅ Create a new review option
exports.createReviewOption = async (req, res) => {
    try {
        const { name, value, image } = req.body;
        const newOption = new ReviewOption({ name, value, image });
        await newOption.save();
        res.status(201).json({ success: true, message: "Review option created" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating review option", error: error.message });
    }
};

// ✅ Get all review options
exports.getAllReviewOptions = async (req, res) => {
    try {
        const options = await ReviewOption.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, options: options });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching review options", error: error.message });
    }
};

// ✅ Get a single review option by ID
exports.getReviewOptionById = async (req, res) => {
    try {
        const option = await ReviewOption.findById(req.params.id);
        if (!option) {
            return res.status(404).json({ success: false, message: "Review option not found" });
        }
        res.status(200).json({ success: true, option });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching review option", error: error.message });
    }
};

// ✅ Update a review option
exports.updateReviewOption = async (req, res) => {
    try {
        const { name, value, image , id } = req.body;
        const updatedOption = await ReviewOption.findByIdAndUpdate(id, { name, value, image }, { new: true });

        if (!updatedOption) {
            return res.status(404).json({ success: false, message: "Review option not found" });
        }

        res.status(200).json({ success: true, message: "Review option updated" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating review option", error: error.message });
    }
};

// ✅ Delete a review option
exports.deleteReviewOption = async (req, res) => {
    try {
        const deletedOption = await ReviewOption.findByIdAndDelete(req.params.id);

        if (!deletedOption) {
            return res.status(404).json({ success: false, message: "Review option not found" });
        }

        res.status(200).json({ success: true, message: "Review option deleted",});
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting review option", error: error.message });
    }
};
