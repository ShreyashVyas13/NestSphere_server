const mongoose = require("mongoose");

const flatSchema = new mongoose.Schema(
  {
    block: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    flatNo: {
  type: Number,
  required: true,
  min: 1,
  max: 999,
},

    floor: {
      type: Number,
      required: true,
    },

    bhkType: {
      type: String,
      enum: ["1RK", "1BHK", "2BHK", "3BHK", "4BHK", "Villa"],
      required: true,
    },

    area: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Vacant", "Occupied"],
      default: "Vacant",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

flatSchema.index(
  {
    block: 1,
    flatNo: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("Flat", flatSchema);