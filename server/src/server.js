// server/src/server.js
const http = require("http");
const app = require("./app");
const connectDB = require("./config/ConnectDB.js");
const { Socket } = require("./socket/Socket.js");
require("../src/cron/updateScheduleStatus.js"); // Import the cron job
const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);

// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    console.log("✅ Connected to Database");

    // Start the HTTP server (NOT app.listen)
    server.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });

    // Initialize Socket.IO with the HTTP server
    Socket(server);     
  })
  .catch((error) => {
    console.error("❌ Database connection error:", error);
  });
