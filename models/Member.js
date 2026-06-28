const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    dob: {
      type: Date,
    },

    block: {
      type: String,
      required: true,
    },

    flatNumber: {
      type: String,
      required: true,
    },

    memberType: {
      type: String,
      enum: ["Owner", "Tenant", "Family"],
      default: "Owner",
    },

    occupation: {
      type: String,
    },

    profileImage: {
      type: String,
      default: "",
    },

    emergencyContact: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Member", memberSchema);