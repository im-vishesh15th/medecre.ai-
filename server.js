
const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const adminRouter = require("./routes/Admins.route");
const appointmentRouter = require("./routes/Appointments.Route");
const doctorRouter = require("./routes/Doctors.Route");
const patientRouter = require("./routes/Patients.Route");
const prescriptionRouter = require("./routes/Prescriptions.Route");
const reportRouter = require("./routes/Reports.Route");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Homepage");
});

// Database Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Route setup
app.use("/admin", adminRouter);
app.use("/appointments", appointmentRouter);
app.use("/doctors", doctorRouter);
app.use("/patients", patientRouter);
app.use("/prescriptions", prescriptionRouter);
app.use("/reports", reportRouter);

// Server Connection
app.listen(process.env.PORT, () => {
  console.log("Server started at port num: ", process.env.PORT);
});







