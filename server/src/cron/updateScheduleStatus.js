const cron = require("node-cron");
const dayjs = require("dayjs");
const Schedule = require("../models/Schedule.js");

cron.schedule("* * * * *", async () => {
  try {
    const schedules = await Schedule.find({ status: { $ne: "Completed" } });
    const now = dayjs();
    const bulkOps = [];

    for (const schedule of schedules) {
      const { _id, date, startTime, endTime, status } = schedule;

      // Construct full start datetime
      const startDateTime = dayjs(`${dayjs(date).format("YYYY-MM-DD")}T${startTime}`);

      // Check if endTime is logically before startTime → assume it's next day
      let endDateTime = dayjs(`${dayjs(date).format("YYYY-MM-DD")}T${endTime}`);
      if (endDateTime.isBefore(startDateTime)) {
        endDateTime = endDateTime.add(1, "day"); // Crosses midnight
      }

      // Determine new status
      let newStatus = "Upcoming";

      if (now.isAfter(endDateTime)) {
        newStatus = "Completed";
      } else if (now.isAfter(startDateTime) && now.isBefore(endDateTime)) {
        newStatus = "Active";
      }

      // Push only if there's a change
      if (status !== newStatus) {
        bulkOps.push({
          updateOne: {
            filter: { _id },
            update: { $set: { status: newStatus } },
          },
        });
      }
    }

    if (bulkOps.length > 0) {
      await Schedule.bulkWrite(bulkOps);
      console.log("✅ Updated schedule statuses.");
    }
  } catch (error) {
    console.error("❌ Error updating schedule statuses:", error.message);
  }
});
