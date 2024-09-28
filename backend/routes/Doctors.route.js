
const express = require("express");
const { DoctorModel } = require("../models/Doctor.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const router = express.Router();

// Fetch all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await DoctorModel.find();
    res.status(200).send(doctors);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

// Register a new doctor
router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    const doctor = await DoctorModel.findOne({ email });
    if (doctor) {
      return res.send({ message: "Doctor already exists" });
    }
    let newDoctor = new DoctorModel(req.body);
    await newDoctor.save();
    return res.send({ message: "Registered successfully" });
  } catch (error) {
    console.log(error)
    res.send({ message: "Error occurred" });
  }
});

// Doctor login
router.post("/login", async (req, res) => {
  const { docID, password } = req.body;
  try {
    const doctor = await DoctorModel.findOne({ docID, password });
    if (doctor) {
      const token = jwt.sign({ foo: "bar" }, process.env.key, { expiresIn: "24h" });
      res.send({ message: "Login successful", user: doctor, token });
    } else {
      res.send({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.log(error);
    res.send({ message: "Error occurred during login" });
  }
});

// Update doctor information
router.patch("/:doctorId", async (req, res) => {
  const id = req.params.doctorId;
  const payload = req.body;
  try {
    const updatedDoctor = await DoctorModel.findByIdAndUpdate(id, payload);
    if (!updatedDoctor) {
      return res.status(404).send({ message: `Doctor with id ${id} not found` });
    }
    res.status(200).send({ message: `Doctor Updated`, user: updatedDoctor });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

// Delete a doctor
router.delete("/:doctorId", async (req, res) => {
  const id = req.params.doctorId;
  try {
    const deletedDoctor = await DoctorModel.findByIdAndDelete(id);
    if (!deletedDoctor) {
      return res.status(404).send({ msg: `Doctor with id ${id} not found` });
    }
    res.status(200).send(`Doctor with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

// Export the doctor routes
module.exports = router;
