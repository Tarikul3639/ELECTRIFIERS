const cron = require("node-cron");
const dayjs = require("dayjs");
const Schedule = require("../models/Schedule.js");
const User = require("../models/User.js");
const { getIO } = require("../socket/Socket.js");

cron.schedule("* * * * *", async () => {
  try {
    const schedules = await Schedule.find({ status: { $ne: "Completed" } });
    const now = dayjs();
    const bulkOps = [];
    const io = getIO();
    const notifyMinutes = [10,9,8,7,6, 5,4,3,2, 1];

    // ✅ Helper function to send socket notification
    const sendNotification = async (division, district, title, message) => {
      const users = await User.find({ division, district }, "socketId");
      users.forEach(user => {
        if (user.socketId) {
          io.to(user.socketId).emit("notify", { title, message });
        }
      });
    };

    for (const schedule of schedules) {
      const { _id, date, startTime, endTime, status, division, district } = schedule;

      const baseDate = dayjs(date).format("YYYY-MM-DD");
      const startDateTime = dayjs(`${baseDate}T${startTime}`);
      let endDateTime = dayjs(`${baseDate}T${endTime}`);

      if (endDateTime.isBefore(startDateTime)) {
        endDateTime = endDateTime.add(1, "day"); // Overnight schedule
      }

      // --- Status Update Logic ---
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

      // --- Notification Logic ---
      const minsBeforeStart = startDateTime.diff(now, "minute");
      const minsBeforeEnd = endDateTime.diff(now, "minute");
      console.log(`Schedule ID: ${_id}, Status: ${newStatus}, Mins Before Start: ${minsBeforeStart}, Mins Before End: ${minsBeforeEnd}`);

      if (notifyMinutes.includes(minsBeforeStart)) {
        await sendNotification(
          division,
          district,
          "⚡ Load Shedding Alert",
          `Power cut will start after ${minsBeforeStart} minute(s).`
        );
      }

      if (notifyMinutes.includes(minsBeforeEnd)) {
        await sendNotification(
          division,
          district,
          "✅ Power Resume Alert",
          `Power will be back after ${minsBeforeEnd} minute(s).`
        );
      }
    }

    if (bulkOps.length > 0) {
      await Schedule.bulkWrite(bulkOps);
      console.log("✅ Updated schedule statuses.");
    }
  } catch (error) {
    console.error("❌ Error in schedule cron job:", error.message);
  }
});
