// config/Socket.js
const { Server } = require("socket.io");
const Schedule = require("../models/Schedule.js");

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
