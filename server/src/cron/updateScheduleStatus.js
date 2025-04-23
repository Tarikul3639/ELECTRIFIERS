const cron = require("node-cron");
const dayjs = require("dayjs");
const Schedule = require("../models/Schedule.js");

cron.schedule("* * * * *", async () => {
  try {
    // Get all schedules
    const schedules = await Schedule.find({});

    // Sort schedules by date first, then by start time in scheduleTime (handling AM/PM)
    schedules.sort((a, b) => {
      const dateA = dayjs(a.date);
      const dateB = dayjs(b.date);

      if (dateA.isBefore(dateB)) return -1;
      if (dateA.isAfter(dateB)) return 1;

      // Dates are equal — now sort by start time
      const startTimeA = dayjs(`${dayjs(a.date).format("YYYY-MM-DD")} ${a.scheduleTime.split(" - ")[0]}`);
      const startTimeB = dayjs(`${dayjs(b.date).format("YYYY-MM-DD")} ${b.scheduleTime.split(" - ")[0]}`);

      return startTimeA - startTimeB;
    });

    const now = dayjs();
    const today = now.format("YYYY-MM-DD");
    const tomorrow = now.add(1, "day").format("YYYY-MM-DD");
    const yesterday = now.subtract(1, "day").format("YYYY-MM-DD");

    const bulkOps = [];

    for (const schedule of schedules) {
      const scheduleDate = dayjs(schedule.date).format("YYYY-MM-DD");

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
      let newDay = dayjs(schedule.date).format("dddd");
      if (scheduleDate === today) {
        newDay = "Today";
      } else if (scheduleDate === tomorrow) {
        newDay = "Tomorrow";
      } else if (scheduleDate === yesterday) {
        newDay = "Yesterday";
      }

      // Only update if needed
      if (schedule.status !== newStatus || schedule.day !== newDay) {
        bulkOps.push({
          updateOne: {
            filter: { _id: schedule._id },
            update: {
              $set: {
                status: newStatus,
                day: newDay,
              },
            },
          },
        });
      }
    }

    // Perform bulk update if needed
    if (bulkOps.length > 0) {
      await Schedule.bulkWrite(bulkOps);
    }
    console.log("✅ Schedule statuses and days updated successfully", schedules);
    console.log("✅ Schedule statuses and days updated");
  } catch (error) {
    console.error("❌ Error updating schedule statuses:", error.message);
  }
});
