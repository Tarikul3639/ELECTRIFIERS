const cron = require("node-cron");
const dayjs = require("dayjs");
const Schedule = require("../models/Schedule.js");

cron.schedule("* * * * *", async () => {
  try {
    const schedules = await Schedule.find();

    for (const schedule of schedules) {
      const now = dayjs();
      const today = now.format("YYYY-MM-DD");
      const tomorrow = now.add(1, "day").format("YYYY-MM-DD");
      const yesterday = now.subtract(1, "day").format("YYYY-MM-DD");

      const scheduleDate = dayjs(schedule.date).format("YYYY-MM-DD");

      // Parse scheduleTime to get start and end time
      const [start, end] = schedule.scheduleTime.split(" - ");
      const startTime = dayjs(`${scheduleDate} ${start}`);
      const endTime = dayjs(`${scheduleDate} ${end}`);

      // Determine status
      let newStatus = "Upcoming";
      if (now.isAfter(endTime)) {
        newStatus = "Completed";
      } else if (now.isAfter(startTime) && now.isBefore(endTime)) {
        newStatus = "Active";
      }

      // Determine day label
      let newDay = dayjs(schedule.date).format("dddd"); // default to day name
      if (scheduleDate === today) {
        newDay = "Today";
      } else if (scheduleDate === tomorrow) {
        newDay = "Tomorrow";
      } else if (scheduleDate === yesterday) {
        newDay = "Yesterday";
      }

      // Only update if something changed
      if (schedule.status !== newStatus || schedule.day !== newDay) {
        schedule.status = newStatus;
        schedule.day = newDay;
        await schedule.save();
      }
    }

    console.log("✅ Schedule statuses and days updated");
  } catch (error) {
    console.error("❌ Error updating schedule statuses:", error.message);
  }
});
