const Schedule = require("../models/Schedule");
const dayjs = require("dayjs");

const AddNewSchedule = (socket, io) => {
  socket.on("add-schedule", async (schedule, callback) => {
    try {
      const { division, district, day, date, scheduleTime } = schedule;

      if (!division || !district || !day || !date || !scheduleTime) {
        return callback({
          status: "error",
          message: "Missing required fields",
        });
      }

      const now = dayjs();
      const selectedDate = dayjs(date);
      const [startTime] = scheduleTime.split(" - ");
      const fullScheduleDateTime = dayjs(
        `${selectedDate.format("YYYY-MM-DD")} ${startTime}`
      );

      // Prevent scheduling in the past
      if (
        selectedDate.isBefore(now, "day") ||
        (selectedDate.isSame(now, "day") && fullScheduleDateTime.isBefore(now))
      ) {
        return callback({
          status: "error",
          message: "Cannot set schedule in the past",
        });
      }

      // Check if schedule already exists for same date, time, division, and district
      const existing = await Schedule.findOne({
        division,
        district,
        date,
        scheduleTime,
      });

      if (existing) {
        return callback({
          status: "error",
          message: "Schedule already exists for this time and location.",
        });
      }

      const newSchedule = new Schedule({
        division,
        district,
        day,
        date,
        scheduleTime,
      });

      await newSchedule.save();

      console.log("✅ Schedule added:", newSchedule);

      callback({
        status: "success",
        message: "Schedule added successfully!",
      });

      // Notify other users
      io.emit("schedule-added", newSchedule);
    } catch (error) {
      console.error("❌ Error adding schedule:", error);
      callback({ status: "error", message: "Failed to add schedule" });
    }
  });

  // Update an existing schedule
  socket.on("update-schedule", async (updateSchedule, callback) => {
    try {
      const { id, day, date, scheduleTime } = updateSchedule;
      console.log("Update schedule data:", updateSchedule);

      const updated = await Schedule.findByIdAndUpdate(
        id,
        Object.fromEntries(
          Object.entries({ day, date, scheduleTime }).filter(
            ([_, v]) => v != null
          )
        ),
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

module.exports = AddNewSchedule;
