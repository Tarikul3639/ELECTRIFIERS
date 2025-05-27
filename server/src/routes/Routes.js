const router = require("express").Router();
const { Login } = require("../controllers/Login.js");
const { Registration } = require("../controllers/Registration.js");
const { Location } = require("../controllers/Location.js");
const { AdminVerify } = require("../controllers/AdminVerify.js");
const verifyToken = require("../middlewares/verifyToken.js");
// const { GroupedSchedules } = require("../controllers/ScheduleController.js");

router.post("/login", Login);
router.post("/registration", Registration);
router.get("/location", Location);
// router.post('/contact',Contact)

// verifyToken must run before AdminVerify
router.get("/verify-admin", verifyToken, AdminVerify);

module.exports = router;
