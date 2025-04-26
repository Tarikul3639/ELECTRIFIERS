const User = require('../models/User.js'); 
const Registration = async (req, res) => {
    // Extract data from the request body
    const { firstName, lastName, email, password, phone, division, district } = req.body;
    try {
        
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        // Create a new user instance
        const newUser = new User({
            name: `${firstName} ${lastName}`,
            email,
            password,
            phone,
            role: email === "tarikulislam3639@gmail.com" ? "admin" : "user",
            division,
            district,
        });
        // Save the new user to the database
        await newUser.save();
        // Respond with a success message
        console.log('Registration request received:', req.body);
        return res.status(200).json({ message: 'Registration successful'});

    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
// Export the Registration function
module.exports = { Registration };