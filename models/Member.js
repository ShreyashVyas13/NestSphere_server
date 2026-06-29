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

    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    dob: {
      type: Date,
    },

    flat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flat",
      required: true,
    },

    memberType: {
      type: String,
      enum: [
        "Owner",
        "Tenant",
        "Family Member",
        "Committee Member",
      ],
      default: "Owner",
    },

    occupation: {
      type: String,
      trim: true,
    },

    aadhaarNumber: {
      type: String,
      trim: true,
    },

    emergencyContact: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    profilePhoto: {
      type: String,
      default: "",
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

module.exports = mongoose.model(
  "Member",
  memberSchema
);