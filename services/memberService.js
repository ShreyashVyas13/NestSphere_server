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

  return member;
};

const getAllMembers = async () => {
  return await Member.find()
    .populate("flat")
    .sort({ createdAt: -1 });
};

const updateMember = async (
  id,
  memberData
) => {
  const member =
    await Member.findById(id);

  if (!member) {
    throw new Error("Member not found.");
  }

  return await Member.findByIdAndUpdate(
    id,
    memberData,
    {
      new: true,
      runValidators: true,
    }
  ).populate("flat");
};

const deleteMember = async (id) => {
  const member =
    await Member.findById(id);

  if (!member) {
    throw new Error("Member not found.");
  }

  await Member.findByIdAndDelete(id);

  return;
};

module.exports = {
  createMember,
  getAllMembers,
  updateMember,
  deleteMember,
};