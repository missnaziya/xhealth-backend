const express = require("express");
const { updatePhoneLogin, getSettingsData } = require("../../controllers/admin/settingController");
const authMiddleware = require("../../middleware/authMiddleware");
const adminMiddleware = require("../../middleware/adminMiddleware");
const router = express.Router()


router.get("/",authMiddleware, adminMiddleware,  getSettingsData)
router.patch("/login-method",authMiddleware, adminMiddleware, updatePhoneLogin)

module.exports = router;