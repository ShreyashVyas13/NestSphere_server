const Member = require("../models/Member");
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

// const updateFlat = async (id, flatData) => {
//   const flat = await Flat.findById(id);

//   if (!flat) {
//     throw new Error("Flat not found.");
//   }

//   return await Flat.findByIdAndUpdate(
//     id,
//     flatData,
//     {
//       new: true,
//       runValidators: true,
//     }
//   );
// };

// const deleteFlat = async (id) => {
//   const flat = await Flat.findById(id);

//   if (!flat) {
//     throw new Error("Flat not found.");
//   }

//   // 👇 Delete validation
//   if (flat.owner) {
//     throw new Error(
//       "Cannot delete flat. Owner is assigned."
//     );
//   }

//   await Flat.findByIdAndDelete(id);
// };

const updateFlat = async (id, flatData) => {
  const flat = await Flat.findById(id);

  if (!flat) {
    throw new Error("Flat not found.");
  }

  const duplicateFlat = await Flat.findOne({
    block: flatData.block,
    flatNo: flatData.flatNo,
    _id: { $ne: id },
  });

  if (duplicateFlat) {
    throw new Error(
      "Flat already exists in this block."
    );
  }

  return await Flat.findByIdAndUpdate(
    id,
    flatData,
    {
      new: true,
      runValidators: true,
    }
  );
};

const deleteFlat = async (id) => {
  const flat = await Flat.findById(id);

  if (!flat) {
    throw new Error("Flat not found.");
  }

  const member = await Member.findOne({
    flat: id,
  });

  if (member) {
    throw new Error(
      `${member.fullName} is assigned to this flat. Remove the member first.`
    );
  }

  await Flat.findByIdAndDelete(id);
};

module.exports = {
  createFlat,
  getAllFlats,
  updateFlat,
  deleteFlat,
};