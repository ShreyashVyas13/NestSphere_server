const Member = require("../models/Member");

const createMember = async (memberData) => {
  const existingMember = await Member.findOne({
    email: memberData.email,
  });

  if (existingMember) {
    throw new Error("Member with this email already exists.");
  }

  const member = await Member.create(memberData);

  return member;
};

module.exports = {
  createMember,
};