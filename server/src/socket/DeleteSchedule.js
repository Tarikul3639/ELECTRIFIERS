const Schedule = require("../models/Schedule");
const User = require("../models/User.js");
const DeleteSchedule = (socket, io) => {
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
};
module.exports = DeleteSchedule;
