
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const dotenv=require("dotenv")
const adminRouter = require("./route/Admins.route");
const appointmentRouter = require("./route/Appointment.route");
const doctorRouter = require("./route/Doctor.route");
const patientRouter = require("./route/Patient.route");
const prescriptionRouter = require("./route/Prescription.route");
const reportRouter = require("./route/Report.route");

dotenv.config();

app.use(express.json())

//Database Connection

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

  app.use("/admin", adminRouter);
  app.use("/appointments", appointmentRouter);
  app.use("/doctors", doctorRouter);
  app.use("/patients", patientRouter);
  app.use("/prescriptions", prescriptionRouter);
  app.use("/reports", reportRouter);

//Connection To Server

app.listen(process.env.PORT, ()=>{
    console.log("Server started at port num : ", process.env.PORT)
})




