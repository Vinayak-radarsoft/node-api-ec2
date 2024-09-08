require("dotenv").config();

const { mongooseLoader } = require("./config");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const appoinmentRoute = require("./src/routes/appoinment");

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(express.static("public"));
app.use(cookieParser())

//api endpoint
app.use("/api", appoinmentRoute);
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// get port from env else default to 5000
const PORT = process.env.PORT || 8080;

// load components
console.log("➡️ Starting to load components in main app");
mongooseLoader();

app.listen(PORT, "localhost", () => {
    console.log(`✅ OnlineKorp server is listening on port ${PORT}.`);
});
