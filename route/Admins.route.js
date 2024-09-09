// const express = require("express");
// const { AdminModel } = require("../models/Admin.model");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const { DoctorModel } = require("../models/Doctor.model");
// const { PatientModel } = require("../models/patient.model");



// const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     const admins = await AdminModel.find();
//     res.status(200).send(admins);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: "Something went wrong" });
//   }
// });

// router.post("/register", async (req, res) => {
//   const { email } = req.body;
//   try {
//     const admin = await AdminModel.findOne({ email });
//     if (admin) {
//       return res.send({
//         message: "Admin already exists",
//       });
//     }
//     let value = new AdminModel(req.body);
//     await value.save();
//     const data = await AdminModel.findOne({ email });
//     return res.send({ data, message: "Registered" });
//   } catch (error) {
//     res.send({ message: "error" });
//   }
// });

// router.post("/login", async (req, res) => {
//   const { adminID, password } = req.body;
//   try {
//     const admin = await AdminModel.findOne({ adminID, password });

//     if (admin) {
//       const token = jwt.sign({ foo: "bar" }, process.env.key, {
//         expiresIn: "24h",
//       });
//       res.send({ message: "Successful", user: admin, token: token });
//     } else {
//       res.send({ message: "Wrong credentials" });
//     }
//   } catch (error) {
//     console.log({ message: "Error" });
//     console.log(error);
//   }
// });

// router.patch("/:adminId", async (req, res) => {
//   const id = req.params.adminId;
//   const payload = req.body;
//   try {
//     const admin = await AdminModel.findByIdAndUpdate({ _id: id }, payload);
//     if (!admin) {
//       res.status(404).send({ msg: `Admin with id ${id} not found` });
//     }
//     res.status(200).send(`Admin with id ${id} updated`);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: "Something went wrong, unable to Update." });
//   }
// });

// router.delete("/:adminId", async (req, res) => {
//   const id = req.params.adminId;
//   try {
//     const admin = await AdminModel.findByIdAndDelete({ _id: id });
//     if (!admin) {
//       res.status(404).send({ msg: `Admin with id ${id} not found` });
//     }
//     res.status(200).send(`Admin with id ${id} deleted`);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: "Something went wrong, unable to Delete." });
//   }
// });


  


// module.exports = router;
const mongoose=require("mongoose")
const express = require("express");
const { AdminModel } = require("../models/Admin.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const router = express.Router();

// Get all admins
router.get("/", async (req, res) => {
  try {
    const admins = await AdminModel.find();
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Unable to fetch admins." });
  }
});

// Register a new admin
router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    const doctor = await DoctorModel.findOne({ email });
    if (doctor) {
      return res.send({ message: "Doctor already exists" });
    }
    const newDoctor = new DoctorModel(req.body);
    await newDoctor.save();
    res.send({ message: "Doctor successfully registered", doctor: newDoctor });
  } catch (error) {
    console.error("Registration error:", error);  // Log the full error
    res.status(500).send({ error: "Error occurred during registration", details: error.message });
  }
});

// Admin login
router.post("/login", async (req, res) => {
  const { adminID, password } = req.body;
  try {
    const admin = await AdminModel.findOne({ adminID, password });

    if (admin) {
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      res.status(200).json({ message: "Login successful", user: admin, token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during login" });
  }
});

// Update admin details
router.patch("/:adminId", async (req, res) => {
  const id = req.params.adminId;
  const payload = req.body;
  try {
    const admin = await AdminModel.findByIdAndUpdate(id, payload, { new: true });

    if (!admin) {
      return res.status(404).json({ msg: `Admin with id ${id} not found` });
    }

    res.status(200).json({ msg: `Admin with id ${id} updated`, admin });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error updating admin" });
  }
});

// Delete an admin
router.delete("/:adminId", async (req, res) => {
  const id = req.params.adminId;
  try {
    const admin = await AdminModel.findByIdAndDelete(id);

    if (!admin) {
      return res.status(404).json({ msg: `Admin with id ${id} not found` });
    }

    res.status(200).json({ msg: `Admin with id ${id} deleted` });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error deleting admin" });
  }
});

module.exports = router;
