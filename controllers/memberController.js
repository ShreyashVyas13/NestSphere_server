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

const getMembers = async (req, res) => {
  try {
    const members = await memberService.getAllMembers();

    res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateMember = async (
  req,
  res
) => {
  try {
    const member =
      await memberService.updateMember(
        req.params.id,
        req.body
      );

    res.status(200).json({
      success: true,
      message:
        "Member updated successfully.",
      data: member,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteMember = async (
  req,
  res
) => {
  try {
    await memberService.deleteMember(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Member deleted successfully.",
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
  getMembers,
  updateMember,
  deleteMember,
};