const User = require("../models/User.js");

const DeleteAccount = (socket, io) => {
  socket.on("delete-account", async ({ user }, callback) => {
    // console.log(user);
    try {
      // First, find the user by email
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        return callback({ status: "error", message: "User not found." });
      }

      // Match additional fields for more security (e.g., name and role)
      if (existingUser.name !== user.name || existingUser.role !== user.role) {
        return callback({ status: "error", message: "User verification failed." });
      }

      // If everything matches, proceed to delete
      await User.deleteOne({ email: user.email });

      console.log("Account deleted successfully.");
      callback({ status: "success", message: "Account deleted successfully!" });
    } catch (err) {
      console.error("Account deletion failed:", err);
      callback({ status: "error", message: "Error deleting account." });
    }
  });
};

module.exports = DeleteAccount;
