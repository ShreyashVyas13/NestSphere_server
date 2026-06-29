const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addMember,
  getMembers,
  updateMember,
  deleteMember,
} = require("../controllers/memberController");

router.post("/", protect, addMember);

router.get("/", protect, getMembers);

router.put(
  "/:id",
  protect,
  updateMember
);

router.delete(
  "/:id",
  protect,
  deleteMember
);

module.exports = router;