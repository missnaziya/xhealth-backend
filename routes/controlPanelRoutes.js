const express = require("express");
const { controlPanelRoutes } = require("../controllers/controlPanelRoutes");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router()

router.get('/',controlPanelRoutes)


module.exports = router;