
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

router.get("/verify-admin", verifyToken, (req, res) => {
  const isAdmin = req.user && req.user.role === "admin";
  res.status(200).json({ isAdmin });
});

module.exports = router;
