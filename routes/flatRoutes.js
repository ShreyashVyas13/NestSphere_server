const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addFlat,
  getFlats,
  updateFlat,
  deleteFlat,
} = require("../controllers/flatController");

router.post("/", protect, addFlat);

router.get("/", protect, getFlats);

router.put("/:id", protect, updateFlat);

router.delete("/:id", protect, deleteFlat);

module.exports = router;