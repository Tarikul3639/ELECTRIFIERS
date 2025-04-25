const ScheduleSortByStatusDateTime = require("../utils/ScheduleSortByStatusDateTime.js");
const Schedule = require("../models/Schedule");
const User = require("../models/User.js");
const LoadAllSchedule = (socket, io) => {
  socket.on("user:load-schedule", async (email, callback) => {
    try {
      const user = await User.findOne({ email }, "division district").lean();
      if (!user) {
        return callback({ status: "error", message: "User not found" });
      }

      const { division, district } = user;
      const schedule = await Schedule.find({ division, district }).lean();

      const sortedSchedule = ScheduleSortByStatusDateTime(schedule);

      console.log("✅ Schedule loaded for user:", email);
      callback({ status: "success", data: sortedSchedule });
    } catch (error) {
      console.error("❌ Error loading schedules:", error);
      callback({ status: "error", message: "Failed to load schedule" });
    }
  });
};
module.exports = LoadAllSchedule;
