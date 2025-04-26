const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login request received:", req.body);

    // Validate request body
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Check if user exists in the database
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compare password (Note: this is plain comparison, not recommended for production)
    if (existingUser.password !== password) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // Generate a token (for example, using JWT or any other method)
    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const user = {
      profileImage: existingUser.profileImage || null,
      email: existingUser.email,
      name: existingUser.name,
      role: existingUser.role,
    };

    // Successful login
    return res.status(200).json({ message: "Login successful.", token, user} );

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Export the Login function
module.exports = { Login };
