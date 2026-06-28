const memberService = require("../services/memberService");

const addMember = async (req, res) => {
  try {
    const member = await memberService.createMember(req.body);

    res.status(201).json({
      success: true,
      message: "Member added successfully.",
      data: member,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addMember,
};