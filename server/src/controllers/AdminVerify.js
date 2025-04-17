// controllers/AdminVerify.js
const AdminVerify = (req, res) => {
    // console.log("Call.......",req.user);
    try {
      const isAdmin = req.user && req.user.role === "admin";
      res.status(200).json({ isAdmin });
    } catch (error) {
      console.error("Error verifying admin:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  module.exports = { AdminVerify };