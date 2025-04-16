const router = require('express').Router();
const {Login} = require('../controllers/Login.js')
const {Registration} = require('../controllers/Registration.js')
const { Location } = require('../controllers/Location.js')

router.post('/login', Login);
router.post('/registration', Registration);
router.get('/location', Location);

// Export the router
module.exports = router;