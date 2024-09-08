const express = require("express");
const { AppoinmentPost, getAppoinment } = require("../controller/appoinment");
const { login, signup, getUser } = require("../controller/user");
const router = express.Router();

router.post("/appoinment", AppoinmentPost);
router.get("/appoinment", getAppoinment);
router.post("/login", login);
router.post("/signup", signup);
router.get("/user", getUser);

module.exports = router;