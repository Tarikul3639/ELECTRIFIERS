const Registration = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Registration request received:', req.body);
        return res.status(200).json({ message: 'Registration successful'});

    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
// Export the Registration function
module.exports = { Registration };