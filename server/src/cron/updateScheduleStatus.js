const cron = require("node-cron");
const dayjs = require("dayjs");
const Schedule = require("../models/Schedule.js");
const User = require("../models/User.js");

cron.schedule("* * * * *", async () => {
  try {
    const schedules = await Schedule.find({ status: { $ne: "Completed" } });
    const now = dayjs();
    const bulkOps = [];

    for (const schedule of schedules) {
      const { _id, date, startTime, endTime, status } = schedule;

      const startDateTime = dayjs(`${dayjs(date).format("YYYY-MM-DD")}T${startTime}`);
      let endDateTime = dayjs(`${dayjs(date).format("YYYY-MM-DD")}T${endTime}`);
      if (endDateTime.isBefore(startDateTime)) {
        endDateTime = endDateTime.add(1, "day");
      }

      let newStatus = "Upcoming";
      if (now.isAfter(endDateTime)) newStatus = "Completed";
      else if (now.isAfter(startDateTime)) newStatus = "Active";

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
