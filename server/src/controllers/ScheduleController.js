const Schedule = require('../models/Schedule.js');

// This will be used inside Socket
const getGroupedSchedules = async () => {
  try {
    const groupedSchedules = await Schedule.aggregate([
      {
        $group: {
          _id: { division: "$division", district: "$district" },
          schedules: { $push: "$$ROOT" },
        },
      },
      {
        $sort: { "_id.division": 1, "_id.district": 1 },
      },
    ]);

    return groupedSchedules;
  } catch (error) {
    console.error("Error getting grouped schedules:", error);
    return [];
  }
};

module.exports = {
  getGroupedSchedules, 
};
