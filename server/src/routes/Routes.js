const router = require('express').Router();
const {Login} = require('../controllers/Login.js')
const {Registration} = require('../controllers/Registration.js')

router.post('/login', Login);
router.post('/registration', Registration);

// Export the router
module.exports = router;