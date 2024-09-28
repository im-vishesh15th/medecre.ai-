

const express = require("express");
const { PatientModel } = require("../models/patient.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { ReportModel } = require("../models/Report.model");

const router = express.Router();

// Fetch all patients
router.get("/", async (req, res) => {
  try {
    const patients = await PatientModel.find();
    res.status(200).send({ patients });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

// Register a new patient
router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    const patient = await PatientModel.findOne({ email });
    if (patient) {
      return res.send({
        message: "Patient already exists",
        id: patient.patientID,
      });
    }
    const newPatient = new PatientModel(req.body);
    await newPatient.save();
    res.send({ id: newPatient.patientID });
  } catch (error) {
    res.send({ error });
  }
});

// Patient login
router.post("/login", async (req, res) => {
  const { patientID, password } = req.body;
  try {
    const patient = await PatientModel.findOne({ patientID, password });
    if (patient) {
      const token = jwt.sign({ foo: "bar" }, process.env.key, { expiresIn: "24h" });
      let email = patient.email;
      let report = await ReportModel.find({ email });
      res.send({
        message: "Login Successful.",
        user: patient,
        token: token,
        report,
      });
    } else {
      res.send({ message: "Wrong credentials, Please try again." });
    }
  } catch (error) {
    console.log(error);
    res.send({ message: "Error occurred, unable to Login." });
  }
});

// Update patient information (Admin only)
router.patch("/:patientId", async (req, res) => {
  const id = req.params.patientId;
  const payload = req.body;
  try {
    const updatedPatient = await PatientModel.findByIdAndUpdate(id, payload);
    if (!updatedPatient) {
      return res.status(404).send({ msg: `Patient with id ${id} not found` });
    }
    res.status(200).send(`Patient with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

// Delete a patient (Admin only)
router.delete("/:patientId", async (req, res) => {
  const id = req.params.patientId;
  try {
    const deletedPatient = await PatientModel.findByIdAndDelete(id);
    if (!deletedPatient) {
      return res.status(404).send({ msg: `Patient with id ${id} not found` });
    }
    res.status(200).send(`Patient with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

// Export the patient routes
module.exports = router;
