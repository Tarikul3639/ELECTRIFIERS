const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL); // ✅ Correct key name

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("✅ Connected to Database");
    });

    connection.on("error", (error) => {
      console.log("❌ MongoDB connection error:", error);
    });
  } catch (error) {
    console.log("❌ Initial connection error:", error);
  }
}

module.exports = connectDB;
