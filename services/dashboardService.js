const Flat = require("../models/Flat");
const Member = require("../models/Member");

const getDashboardStats = async () => {
  const totalFlats = await Flat.countDocuments();

  const totalMembers =
    await Member.countDocuments();

  const occupiedFlats =
    await Flat.countDocuments({
      status: "Occupied",
    });

  const vacantFlats =
    await Flat.countDocuments({
      status: "Vacant",
    });

  const bhkDistribution =
    await Flat.aggregate([
      {
        $group: {
          _id: "$bhkType",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

  const recentMembers =
    await Member.find()
      .populate("flat")
      .sort({
        createdAt: -1,
      })
      .limit(5);

  const recentFlats =
    await Flat.find()
      .sort({
        createdAt: -1,
      })
      .limit(5);

  return {
    totalFlats,
    totalMembers,
    occupiedFlats,
    vacantFlats,
    bhkDistribution,
    recentMembers,
    recentFlats,
  };
};

module.exports = {
  getDashboardStats,
};