const Schedule = require("../models/Schedule");
const User = require("../models/User.js");
const ProfileImageCustom = (socket, io) => {
  socket.on(
    "update-profile-image",
    async ({ email, profileImage }, callback) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { email },
          { profileImage },
          { new: true }
        );

        if (updatedUser) {
          console.log("Profile image updated successfully.");
          return callback({ status: "success", data: updatedUser });
        } else {
          return callback({ status: "error", message: "User not found" });
        }
      } catch (err) {
        console.error("Update failed:", err);
        callback({ status: "error", message: "Error updating profile" });
      }
    }
  );
};
module.exports = ProfileImageCustom;
