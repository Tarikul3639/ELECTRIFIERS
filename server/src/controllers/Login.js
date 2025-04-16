const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Login request received:', req.body);
        return res.status(200).json({ message: 'Login successful'});

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
// Export the Login function
module.exports = { Login };