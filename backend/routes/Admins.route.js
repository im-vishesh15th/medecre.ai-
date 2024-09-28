

const express = require("express");
const { AdminModel } = require("../models/Admin.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { DoctorModel } = require("../models/Doctor.model");
const { PatientModel } = require("../models/patient.model");

const router = express.Router();

// Route to fetch all admins
router.get("/", async (req, res) => {
  try {
    const admins = await AdminModel.find();
    res.status(200).send(admins);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

// Admin registration
router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    const admin = await AdminModel.findOne({ email });
    if (admin) {
      return res.send({ message: "Admin already exists" });
    }
    let newAdmin = new AdminModel(req.body);
    await newAdmin.save();
    return res.send({ message: "Registered successfully" });
  } catch (error) {
    res.send({ message: "Error occurred" });
  }
});

// Admin login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await AdminModel.findOne({ email, password });
    if (admin) {
      const token = jwt.sign({ foo: "bar" }, process.env.key, { expiresIn: "24h" });
      res.send({ message: "Login successful", token });
    } else {
      res.send({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.log(error);
    res.send({ message: "Error occurred during login" });
  }
});

// Admin can update patient and doctor records
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    const updatedDoc = await DoctorModel.findByIdAndUpdate(id, payload);
    const updatedPat = await PatientModel.findByIdAndUpdate(id, payload);
    if (!updatedDoc && !updatedPat) {
      return res.status(404).send({ message: `Record with id ${id} not found` });
    }
    res.status(200).send({ message: `Record with id ${id} updated` });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

// Admin can delete patient and doctor records
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedDoc = await DoctorModel.findByIdAndDelete(id);
    const deletedPat = await PatientModel.findByIdAndDelete(id);
    if (!deletedDoc && !deletedPat) {
      return res.status(404).send({ message: `Record with id ${id} not found` });
    }
    res.status(200).send({ message: `Record with id ${id} deleted` });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

// Export the admin routes
module.exports = router;
