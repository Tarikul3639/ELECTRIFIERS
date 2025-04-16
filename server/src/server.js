// server/src/server.js
const app = require("./app");
const connectDB = require("./config/ConnectDB.js");

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log("✅ Connected to Database");
    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection error:", error);
  });

