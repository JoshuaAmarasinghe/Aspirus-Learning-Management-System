const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();

app.use(express.static('public'));
//limiting image size to 50mb
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

const StaffRouter = require("./routes/staffrouter");
const studentRouter= require("./routes/students.js");

//getting the database url
const URL = process.env.MONGODB_URL;

//connect to database url with the given options
mongoose.connect(URL)

//database connection
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("Aspirus Learning Management System db connection success");
});

//when http://localhost:8070/staff run it will execute staffrouter.js file
app.use("/staff", StaffRouter);
// Apoinment manager routes 
app.use("/noticeandeventManager", require("./routes/NoticesAndEventsRoute"));
//Student Managment Routes
app.use("/student", studentRouter);
//use courses.js file created in routes folder pass data frontend to backend
app.use("/course", require("./routes/courses"));
app.use("/content", require("./routes/contents"));

//defining a port to run the application
//use port 8070 or use any other port if the 8070 is unavailable 
const PORT = process.env.PORT || 8080;

//running the app in previously defined port
const server = app.listen(PORT, () => {
  console.log(`Server is up and running on: ${PORT}`);
})

//if the server crashed show it simply and stop the server
process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged error: ${error}`);
  server.close(() => process.exit(1));
})


