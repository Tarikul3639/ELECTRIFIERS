const ScheduleSortByStatusDateTime = require("../utils/ScheduleSortByStatusDateTime.js");
const Schedule = require("../models/Schedule");
const User = require("../models/User.js");
const LocationFilter = (socket, io) => {
    socket.on("load-schedule", async (location) => {
        try {
          let schedules = [];
  
          if (!location) {
           const AllSchedule = await Schedule.find({});
            schedules = ScheduleSortByStatusDateTime(AllSchedule);
          } else if (location.division && !location.district) {
            schedules = await Schedule.find({ division: location.division });
          } else if (location.division && location.district) {
            schedules = await Schedule.find({
              division: location.division,
              district: location.district,
            });
          }
  
          socket.emit("load-schedule", schedules);
        } catch (error) {
          console.error("❌ Error loading schedules:", error);
          socket.emit("load-schedule", []);
        }
      });
};

module.exports = LocationFilter;