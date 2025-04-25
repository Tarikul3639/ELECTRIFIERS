const ScheduleSortByStatusDateTime = require("../utils/ScheduleSortByStatusDateTime.js");
const Schedule = require("../models/Schedule");
const dayjs = require("dayjs");

const AddNewSchedule = (socket, io) => {
  socket.on("add-schedule", async (schedule, callback) => {
    try {
      const { division, district, date, startTime, endTime } = schedule;

      if (!division || !district || !date || !startTime || !endTime) {
        return callback({
          status: "error",
          message: "Missing required fields",
        });
      }

      const now = dayjs(); // current time
      const selectedDate = dayjs(date); // input date (yyyy-MM-dd)
      const scheduleStart = dayjs(`${date} ${startTime}`);
      const scheduleEnd = dayjs(`${date} ${endTime}`);

      // Prevent scheduling in the past
      if (
        selectedDate.isBefore(now, "day") ||
        (selectedDate.isSame(now, "day") && scheduleEnd.isBefore(now))
      ) {
        return callback({
          status: "error",
          message: "Cannot set schedule in the past",
        });
      }

      // Check for duplicate schedule
      const existing = await Schedule.findOne({
        division,
        district,
        date: selectedDate.toDate(),
        startTime,
        endTime,
      });

      if (existing) {
        return callback({
          status: "error",
          message: "Schedule already exists for this time and location.",
        });
      }

      // Determine status
      let status = "Upcoming";
      if (scheduleStart.isBefore(now) && scheduleEnd.isAfter(now)) {
        status = "Active";
      }

      const newSchedule = new Schedule({
        division,
        district,
        date: selectedDate.toDate(),
        startTime,
        endTime,
        status,
      });

      await newSchedule.save();

      console.log("✅ Schedule added:", newSchedule);

      callback({
        status: "success",
        message: "Schedule added successfully!",
      });

      io.emit("schedule-added", newSchedule);
    } catch (error) {
      console.error("❌ Error adding schedule:", error);
      callback({ status: "error", message: "Failed to add schedule" });
    }
  });
};

module.exports = AddNewSchedule;
