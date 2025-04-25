const ScheduleSortByStatusDateTime = require("../utils/ScheduleSortByStatusDateTime.js");
const Schedule = require("../models/Schedule");
const dayjs = require("dayjs");
const UpdateSchedule = (io, socket) => {
  // Update an existing schedule
  socket.on("update-schedule", async (updateSchedule, callback) => {
    try {
      const { id, date, startTime, endTime } = updateSchedule;
      console.log("Update schedule data:", updateSchedule);

      // Validate required fields
      if (!id || !date || !startTime || !endTime) {
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
          message: "Cannot update schedule to a past time",
        });
      }

      // Determine new status
      let status = "Upcoming";
      if (scheduleStart.isBefore(now) && scheduleEnd.isAfter(now)) {
        status = "Active";
      }

      // Update schedule
      const updated = await Schedule.findByIdAndUpdate(
        id,
        {
          date: selectedDate.toDate(),
          startTime,
          endTime,
          status,
        },
        { new: true }
      );

      if (!updated) {
        return callback({
          status: "error",
          message: "Schedule not found",
        });
      }

      console.log("✅ Schedule updated:", updated);

      callback({
        status: "success",
        message: "Schedule updated successfully!",
      });

      // Notify other users
      io.emit("schedule-updated", updated);
    } catch (error) {
      console.error("❌ Error updating schedule:", error);
      callback({ status: "error", message: "Failed to update schedule" });
    }
  });
};
module.exports = UpdateSchedule;
