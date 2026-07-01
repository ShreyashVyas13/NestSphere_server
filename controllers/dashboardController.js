const dashboardService = require("../services/dashboardService");

const getDashboardStats = async (
  req,
  res
) => {
  try {
    const data =
      await dashboardService.getDashboardStats();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};