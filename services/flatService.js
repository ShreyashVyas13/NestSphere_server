const Flat = require("../models/Flat");

const createFlat = async (flatData) => {
  const existingFlat = await Flat.findOne({
    block: flatData.block,
    flatNo: flatData.flatNo,
  });

  if (existingFlat) {
    throw new Error("Flat already exists in this block.");
  }

  return await Flat.create(flatData);
};

const getAllFlats = async () => {
  return await Flat.find().sort({
    createdAt: -1,
  });
};

module.exports = {
  createFlat,
  getAllFlats,
};