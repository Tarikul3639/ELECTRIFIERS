// config/Socket.js
const { Server } = require("socket.io");

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
  io.on("connection", (socket) => {
    // Example: Register the user
    socket.on("user:connected", (user) => {
      // Store the user in the activeUsers map
      activeUsers.set(socket.id, user.email);

      console.log("✅ New socket user connected: ", activeUsers.get(socket.id));
    });

    // Schedule sending to the client
    socket.emit("load-schedule", "Connected to socket server");

    // Handle the load schedule event here
    socket.on("load-schedule", (data) => {
      console.log("✅ Load schedule event received: ", data);
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
