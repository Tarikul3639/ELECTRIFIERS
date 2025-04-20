// config/Socket.js
const { Server } = require("socket.io");
const Schedule = require("../models/Schedule.js");
const User = require("../models/User.js");

let io = null;
// Store active users in a Map
const activeUsers = new Map();
// Socket.IO initialization
const Socket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  console.log("✅ Socket.IO initialized");

  //Connecting to Socket.IO
  io.on("connection", async (socket) => {
    // Example: Register the user
    socket.on("user:connected", (user) => {
      // Store the user in the activeUsers map
      activeUsers.set(socket.id, user.email);

      console.log("✅ New socket user connected: ", activeUsers.get(socket.id));
    });

    socket.on("user:load-schedule", async (email,callback) => {
      try {
        const user = await User.findOne({ email }, 'division district').lean();
        if (!user) {
            return callback({ status: "error", message: "User not found" });
        }
        const { division, district } = user;

        // Fetch schedules based on user division and district
        const schedule = await Schedule.find({ division, district });
        console.log("✅ Schedule loaded for user:", email, schedule);

        callback({ status: "success", data: schedule });
      } catch (error) {
        console.error("❌ Error loading schedules:", error);
        callback({ status: "error", message: "Failed to load schedule" });
      }
    });
    // Handle the load schedule event here
    socket.on("load-schedule", async (location) => {
      // console.log(location);
      // console.log( "OK?",location,"2",location.division);
      try {
        let schedules;
        // No filter: return all schedules
        if (!location) {
          schedules = await Schedule.find({});
        }
        // Division only
        else if (location.division && !location.district) {
          schedules = await Schedule.find({ division: location.division });
        }
        // Division + District
        else if (location.division && location.district) {
          schedules = await Schedule.find({
            division: location.division,
            district: location.district,
          });
        } else {
          schedules = [];
        }

        // console.log(schedules);
        socket.emit("load-schedule", schedules);
      } catch (error) {
        console.error("❌ Error loading schedules:", error);
        socket.emit("load-schedule", []);
      }
    });

    socket.on("add-schedule", async (schedule, callback) => {
      try {
        const { division, district, day, date, scheduleTime } = schedule;
        if (!division || !district || !day || !date || !scheduleTime) {
          return callback({
            status: "error",
            message: "Missing required fields",
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

        // Optional: Emit to others if needed
        io.emit("schedule-added", newSchedule);
      } catch (error) {
        console.error("❌ Error adding schedule:", error);
        callback({ status: "error", message: "Failed to add schedule" });
      }
    });

    socket.on('update-schedule', async (updateSchedule, callback) => {
      try {
        const { id, day, date, scheduleTime } = updateSchedule;
        console.log("Update schedule data:", updateSchedule);

        // Find the schedule by ID and update it which is not null
        const updated = await Schedule.findByIdAndUpdate(
          id,
          Object.fromEntries(
            Object.entries({ day, date, scheduleTime }).filter(([_, v]) => v != null)
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

        // Optional: Emit to others if needed
        io.emit("schedule-updated", updated);
      } catch (error) {
        console.error("❌ Error updating schedule:", error);
        callback({ status: "error", message: "Failed to update schedule" });
      }
    });

    socket.on("delete-schedule", async (id, callback) => {
      try {
        const deletedSchedule = await Schedule.findByIdAndDelete(id);
        if (!deletedSchedule) {
          return callback({
            status: "error",
            message: "Schedule not found",
          });
        }

        console.log("✅ Schedule deleted:", deletedSchedule);
        callback({
          status: "success",
          message: "Schedule deleted successfully!",
        });

        // Optional: Emit to others if needed
        io.emit("schedule-deleted", deletedSchedule);
      } catch (error) {
        console.error("❌ Error deleting schedule:", error);
        callback({ status: "error", message: "Failed to delete schedule" });
      }
    });

    socket.on("disconnect", () => {
      const user = activeUsers.get(socket.id);
      if (user) {
        console.log("❌ Socket user disconnected: ", user);
        // Remove the user from the activeUsers map
        activeUsers.delete(socket.id);
      } else {
        console.log("❌ Disconnected unknown user from socket: ", socket.id);
      }
    });
  });

  return io;
};

const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};

module.exports = {
  Socket,
  getIO,
};
