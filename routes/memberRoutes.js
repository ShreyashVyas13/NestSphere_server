const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addMember,
} = require("../controllers/memberController");

router.post("/", protect, addMember);

module.exports = router;