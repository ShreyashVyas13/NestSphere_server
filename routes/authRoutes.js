const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  getProfile,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

router.post("/login", loginAdmin);

// Protected Route
router.get("/profile", protect, getProfile);

module.exports = router;