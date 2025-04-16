const { locationData } = require('../data/locationData');

// Location controller
const Location = (req, res) => {
    try {
        // Return all cities and their areas from the locationData
        res.status(200).json(locationData);
    } catch (error) {
        console.error('Error fetching location data:', error); 
        res.status(500).json({ message: 'Internal Server Error' }); 
    }
}

module.exports = { Location };
