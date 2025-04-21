// config/Socket.js
const { Server } = require("socket.io");
const Schedule = require("../models/Schedule.js");
const AddNewSchedule = require("./AddNewSchedule.js");
const User = require("../models/User.js");

let io = null;

// Store active users using socket.id as key
const activeUsers = new Map();

// Initialize Socket.IO
const Socket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  console.log("✅ Socket.IO initialized");

  io.on("connection", async (socket) => {
    // When user connects
    socket.on("user:connected", (user) => {
      activeUsers.set(socket.id, user.email);
      console.log("✅ New socket user connected:", user.email);
    });

    // Load schedule based on user email
    socket.on("user:load-schedule", async (email, callback) => {
      try {
        const user = await User.findOne({ email }, "division district").lean();
        if (!user) {
          return callback({ status: "error", message: "User not found" });
        }

        const { division, district } = user;
        const schedule = await Schedule.find({ division, district });

        console.log("✅ Schedule loaded for user:", email);
        callback({ status: "success", data: schedule });
      } catch (error) {
        console.error("❌ Error loading schedules:", error);
        callback({ status: "error", message: "Failed to load schedule" });
      }
    });

    // Load schedule based on location filter
    socket.on("load-schedule", async (location) => {
      try {
        let schedules = [];

        if (!location) {
          schedules = await Schedule.find({});
        } else if (location.division && !location.district) {
          schedules = await Schedule.find({ division: location.division });
        } else if (location.division && location.district) {
          schedules = await Schedule.find({
            division: location.division,
            district: location.district,
          });
        }

        socket.emit("load-schedule", schedules);
      } catch (error) {
        console.error("❌ Error loading schedules:", error);
        socket.emit("load-schedule", []);
      }
    });

    // Add a new schedule
    AddNewSchedule(socket, io);
   
    // Delete a schedule
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

        // Notify other users
        io.emit("schedule-deleted", deletedSchedule);
      } catch (error) {
        console.error("❌ Error deleting schedule:", error);
        callback({ status: "error", message: "Failed to delete schedule" });
      }
    });

    // When a user disconnects
    socket.on("disconnect", () => {
      const user = activeUsers.get(socket.id);
      if (user) {
        console.log("❌ Socket user disconnected:", user);
        activeUsers.delete(socket.id);
      } else {
        console.log("❌ Disconnected unknown socket:", socket.id);
      }
    });
  });

  return io;
};

// Get initialized instance of Socket.IO
const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};

module.exports = {
  Socket,
  getIO,
};
