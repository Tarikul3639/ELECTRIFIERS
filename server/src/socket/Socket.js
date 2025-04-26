const { Server } = require("socket.io");
const AddNewSchedule = require("./AddNewSchedule.js");
const DeleteSchedule = require("./DeleteSchedule.js");
const LocationFilter = require("./LocationFilter.js");
const LoadAllSchedule = require("./LoadAllSchedule.js");
const ProfileImageCustom = require("./ProfileImageCustom.js");
const UpdateSchedule = require("./UpdateSchedule.js");
const User = require("../models/User.js");
const DeleteAccount = require("./DeleteAccount.js");

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
    socket.on("user:connected", async (user) => {
      activeUsers.set(socket.id, user.email);
      console.log("✅ New socket user connected:", user.email);

      // ✅ Update socketId in User schema
      try {
        await User.findOneAndUpdate(
          { email: user.email },
          { socketId: socket.id },
          { new: true }
        );
        console.log("✅ socketId updated in DB for:", user.email);
      } catch (error) {
        console.error("❌ Error updating socketId:", error.message);
      }
    });

    // Profile image update
    ProfileImageCustom(socket, io);

    // Load schedule based on user email
    LoadAllSchedule(socket, io);

    // Load schedule based on location filter
    LocationFilter(socket, io);

    // Add a new schedule
    AddNewSchedule(socket, io);

    // Update a schedule
    UpdateSchedule(socket, io);

    // Delete a schedule
    DeleteSchedule(socket, io);

    // Delete account
    DeleteAccount(socket, io);

    // When a user disconnects
    socket.on("disconnect", async () => {
      const userEmail = activeUsers.get(socket.id);
      if (userEmail) {
        console.log("❌ Socket user disconnected:", userEmail);
        activeUsers.delete(socket.id);

        // ✅ Optionally reset the socketId
        try {
          await User.findOneAndUpdate(
            { email: userEmail },
            { socketId: null },
            { new: true }
          );
          console.log("✅ socketId reset in DB for:", userEmail);
        } catch (error) {
          console.error("❌ Error resetting socketId:", error.message);
        }
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
