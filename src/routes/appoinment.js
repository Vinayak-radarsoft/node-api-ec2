const express = require("express");
const { AppoinmentPost, getAppoinment } = require("../controller/appoinment");
const router = express.Router();

router.post("/appoinment", AppoinmentPost);
router.get("/appoinment", getAppoinment);

module.exports = router;