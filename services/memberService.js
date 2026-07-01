const Member = require("../models/Member");
const Flat = require("../models/Flat");

const createMember = async (memberData) => {
  const existingEmail = await Member.findOne({
    email: memberData.email,
  });

  if (existingEmail) {
    throw new Error("Email already exists.");
  }

  const existingMobile = await Member.findOne({
    mobile: memberData.mobile,
  });

  if (existingMobile) {
    throw new Error("Mobile number already exists.");
  }

  const flat = await Flat.findById(memberData.flat);

  if (!flat) {
    throw new Error("Selected flat not found.");
  }

  const member = await Member.create(memberData);

  await Flat.findByIdAndUpdate(memberData.flat, {
    status: "Occupied",
  });

  return member;
};

const getAllMembers = async () => {
  return await Member.find().populate("flat").sort({ createdAt: -1 });
};

const updateMember = async (id, memberData) => {
  const member = await Member.findById(id);

  if (!member) {
    throw new Error("Member not found.");
  }

  // Email duplicate check
  const existingEmail = await Member.findOne({
    email: memberData.email,
    _id: { $ne: id },
  });

  if (existingEmail) {
    throw new Error("Email already exists.");
  }

  // Mobile duplicate check
  const existingMobile = await Member.findOne({
    mobile: memberData.mobile,
    _id: { $ne: id },
  });

  if (existingMobile) {
    throw new Error("Mobile number already exists.");
  }

  const oldFlatId = member.flat?.toString();
  const newFlatId = memberData.flat;

  // Update member
  const updatedMember = await Member.findByIdAndUpdate(id, memberData, {
    new: true,
    runValidators: true,
  }).populate("flat");

  // Flat changed
  if (oldFlatId !== newFlatId) {
    // New flat occupied
    await Flat.findByIdAndUpdate(newFlatId, {
      status: "Occupied",
    });

    // Check old flat
    const remainingMembers = await Member.countDocuments({
      flat: oldFlatId,
    });

    if (remainingMembers === 0) {
      await Flat.findByIdAndUpdate(oldFlatId, {
        status: "Vacant",
      });
    }
  }

  return updatedMember;
};

const deleteMember = async (id) => {
  const member = await Member.findById(id);

  if (!member) {
    throw new Error("Member not found.");
  }

  await Member.findByIdAndDelete(id);
  const remainingMembers = await Member.countDocuments({
    flat: member.flat,
  });

  if (remainingMembers === 0) {
    await Flat.findByIdAndUpdate(member.flat, {
      status: "Vacant",
    });
  }

  return;
};

module.exports = {
  createMember,
  getAllMembers,
  updateMember,
  deleteMember,
};
