const reviewOption = require("../models/reviewOption");

// ✅ Get all review options
exports.getAllReviewOptions = async (req, res) => {
    try {
        const options = await reviewOption.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, options: options });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching review options", error: error.message });
    }
};