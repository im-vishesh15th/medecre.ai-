// // const express = require("express");
// // const { AppointmentModel } = require("../models/Appointment.model");

// // const router = express.Router();

// // router.get("/", async (req, res) => {
// //   let query = req.query;
// //   try {
// //     const appointments = await AppointmentModel.find(query);
// //     res.status(200).send(appointments);
// //   } catch (error) {
// //     console.log(error);
// //     res.status(400).send({ error: "Something went wrong" });
// //   }
// // });

// // router.post("/create", async (req, res) => {
// //   const payload = req.body;
// //   try {
// //     const appointment = new AppointmentModel(payload);
// //     await appointment.save();
// //   } catch (error) {
// //     res.send(error);
// //   }
// //   res.send("Appointment successfully booked.");
// // });


// // router.patch("/:appointmentId", async (req, res) => {
// //     const id = req.params.appointmentId;
// //     const payload = req.body;
// //     try {
// //       const appointment = await AppointmentModel.findByIdAndUpdate(
// //         { _id: id },
// //         payload
// //       );
// //       if (!appointment) {
// //         res.status(404).send({ msg: `Appointment with id ${id} not found` });
// //       }
// //       res.status(200).send(`Appointment with id ${id} updated`);
// //     } catch (error) {
// //       console.log(error);
// //       res.status(400).send({ error: "Something went wrong, unable to Update." });
// //     }
// //   });

// // router.delete("/:appointmentId", async (req, res) => {
// //     const id = req.params.appointmentId;
// //     try {
// //       const appointment = await AppointmentModel.findByIdAndDelete({ _id: id });
// //       if (!appointment) {
// //         res.status(404).send({ msg: `Appointment with id ${id} not found` });
// //       }
// //       res.status(200).send(`Appointment with id ${id} deleted`);
// //     } catch (error) {
// //       console.log(error);
// //       res.status(400).send({ error: "Something went wrong, unable to Delete." });
// //     }
// //   });
  
// //   module.exports = router;

// const express = require("express");
// const { AppointmentModel } = require("../models/Appointment.model");

// const router = express.Router();

// // Get all appointments with optional query parameters
// router.get("/", async (req, res) => {
//   const query = req.query;
//   try {
//     const appointments = await AppointmentModel.find(query);
//     res.status(200).json(appointments);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error. Unable to fetch appointments." });
//   }
// });

// // Create a new appointment
// router.post("/create", async (req, res) => {
//   const payload = req.body;
//   try {
//     const appointment = new AppointmentModel(payload);
//     await appointment.save();
//     res.status(201).json({ message: "Appointment successfully booked.", appointment });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ error: "Error creating appointment." });
//   }
// });

// // Update an appointment
// router.patch("/:appointmentId", async (req, res) => {
//   const id = req.params.appointmentId;
//   const payload = req.body;
//   try {
//     const appointment = await AppointmentModel.findByIdAndUpdate(id, payload, { new: true });

//     if (!appointment) {
//       return res.status(404).json({ msg: `Appointment with id ${id} not found` });
//     }

//     res.status(200).json({ msg: `Appointment with id ${id} updated`, appointment });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ error: "Error updating appointment." });
//   }
// });

// // Delete an appointment
// router.delete("/:appointmentId", async (req, res) => {
//   const id = req.params.appointmentId;
//   try {
//     const appointment = await AppointmentModel.findByIdAndDelete(id);

//     if (!appointment) {
//       return res.status(404).json({ msg: `Appointment with id ${id} not found` });
//     }

//     res.status(200).json({ msg: `Appointment with id ${id} deleted` });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ error: "Error deleting appointment." });
//   }
// });

// module.exports = router;

const express = require("express");
const { AppointmentModel } = require("../models/Appointment.model");

const router = express.Router();

router.get("/", async (req, res) => {
  let query = req.query;
  try {
    const appointments = await AppointmentModel.find(query);
    res.status(200).send(appointments);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const appointment = new AppointmentModel(payload);
    await appointment.save();
  } catch (error) {
    res.send(error);
  }
  res.send("Appointment successfully booked.");
});

router.patch("/:appointmentId", async (req, res) => {
  const id = req.params.appointmentId;
  const payload = req.body;
  try {
    const appointment = await AppointmentModel.findByIdAndUpdate(
      { _id: id },
      payload
    );
    if (!appointment) {
      res.status(404).send({ msg: `Appointment with id ${id} not found` });
    }
    res.status(200).send(`Appointment with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:appointmentId", async (req, res) => {
  const id = req.params.appointmentId;
  try {
    const appointment = await AppointmentModel.findByIdAndDelete({ _id: id });
    if (!appointment) {
      res.status(404).send({ msg: `Appointment with id ${id} not found` });
    }
    res.status(200).send(`Appointment with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;



