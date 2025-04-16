const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URl);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to Database");
    });

    connection.on("error", (error) => {
      console.log("Something is wrong in MongoDB", error);
    });
  } catch (error) {
    console.log("Something is wrong", error);
  }
}
module.exports = connectDB ;
