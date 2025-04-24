const cron = require("node-cron");
const dayjs = require("dayjs");
const Schedule = require("../models/Schedule.js");

cron.schedule("* * * * *", async () => {
  try {
    const schedules = await Schedule.find({});
    const now = dayjs();

    const bulkOps = [];

    for (const schedule of schedules) {
      const { startTime, endTime, date } = schedule;

      // Convert full date + time
      const startDateTime = dayjs(`${date}T${startTime}`);
      const endDateTime = dayjs(`${date}T${endTime}`);

      // Determine new status
      let newStatus = "Upcoming";

      if (now.isAfter(endDateTime)) {
        newStatus = "Completed";
      } else if (now.isAfter(startDateTime) && now.isBefore(endDateTime)) {
        newStatus = "Active";
      }

      // Update if status changed
      if (schedule.status !== newStatus) {
        bulkOps.push({
          updateOne: {
            filter: { _id: schedule._id },
            update: { $set: { status: newStatus } },
          },
        });
      }
    }

    // Bulk update only if needed
    if (bulkOps.length > 0) {
      await Schedule.bulkWrite(bulkOps);
      console.log("✅ Updated schedule statuses.");
    }
  } catch (error) {
    console.error("❌ Error updating schedule statuses:", error.message);
  }
});
