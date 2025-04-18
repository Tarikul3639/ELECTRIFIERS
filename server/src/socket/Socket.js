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
    console.log("🔌 New client connected:", socket.id);

    // Example: Register the user
    socket.on("user:connected", (user) => {
      console.log("user:connected:", user);
      // Save user data or trigger any other actions based on this event
    }); 

    // Example listener
    socket.on("ping", () => {
      socket.emit("pong");
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
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
