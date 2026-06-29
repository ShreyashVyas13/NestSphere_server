const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addFlat,
  getFlats,
} = require("../controllers/flatController");

router.post("/", protect, addFlat);

router.get("/", protect, getFlats);

module.exports = router;