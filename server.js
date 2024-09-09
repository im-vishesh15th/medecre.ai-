
// // const express = require("express")

// // const app = express()
// // const dotenv=require("dotenv")
// // const adminRouter = require("./route/Admins.route");
// // const appointmentRouter = require("./route/Appointments.route");
// // const doctorRouter = require("./route/Doctors.route");
// // const patientRouter = require("./route/Patients.route");
// // const prescriptionRouter = require("./route/Prescriptions.Route");
// // const reportRouter = require("./route/Reports.Route");

// // dotenv.config();

// // app.use(express.json())

// // //Database Connection


// //   app.use("/admin", adminRouter);
// //   app.use("/appointments", appointmentRouter);
// //   app.use("/doctors", doctorRouter);
// //   app.use("/patients", patientRouter);
// //   app.use("/prescriptions", prescriptionRouter);
// //   app.use("/reports", reportRouter);

// // //Connection To Server

// // app.listen(process.env.PORT, ()=>{
// //     console.log("Server started at port num : ", process.env.PORT)
// // })

// // app.listen(process.env.port, async () => {
// //   try {
// //     await connection;
// //     console.log("Connected to DB");
// //   } catch (error) {
// //     console.log("Unable to connect to DB");
// //     console.log(error);
// //   }
// //   console.log(`Listening at port ${process.env.port}`);
// // });

// const express = require("express");
// const mongoose = require("mongoose")

// require("dotenv").config();


// const adminRouter = require("./routes/Admins.route");

// const appointmentRouter = require("./routes/Appointments.Route");

// const doctorRouter = require("./routes/Doctors.Route");

// const patientRouter = require("./routes/Patients.Route");

// const prescriptionRouter = require("./routes/Prescriptions.Route");
// const reportRouter = require("./routes/Reports.Route");

// const app = express();

// app.use(express.json());


// app.get("/", (req, res) => {
//   res.send("Homepage");
// });
// mongoose.connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB:', err);
//   });

// app.use("/admin", adminRouter);

// app.use("/appointments", appointmentRouter);

// app.use("/doctors", doctorRouter);


// app.use("/patients", patientRouter);

// app.use("/prescriptions", prescriptionRouter);
// app.use("/reports", reportRouter);


// app.listen(process.env.PORT, ()=>{
//     console.log("Server started at port num : ", process.env.PORT)
// })




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






