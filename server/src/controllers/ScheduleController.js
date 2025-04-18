const mongoose = require("mongoose");
const ScheduleManage = require("../models/ScheduleManage.js"); 
const User = require("../models/User.js");

// Get grouped schedules by division and district
const GroupedSchedules = async (req, res) => {
    try {
        const groupedSchedules = await ScheduleManage.aggregate([
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

        res.status(200).json(groupedSchedules);
    } catch (error) {
        console.error("Error grouping schedules:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    GroupedSchedules
};
