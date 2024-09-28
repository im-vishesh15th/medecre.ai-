
const express = require("express");
const { PrescriptionModel } = require("../models/Prescription.model");

const router = express.Router();

// Fetch all prescriptions
router.get("/", async (req, res) => {
  let query = req.query; // Query parameters
  try {
    const prescriptions = await PrescriptionModel.find(query); // Find prescriptions based on query
    res.status(200).send(prescriptions);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

// Create a new prescription
router.post("/create", async (req, res) => {
  const payload = req.body; // Get the payload from the request
  try {
    const prescription = new PrescriptionModel(payload); // Create a new prescription
    await prescription.save(); // Save the prescription to the database
    res.send("Prescription successfully created."); // Success response
  } catch (error) {
    res.send("Error occurred, unable to create a prescription."); // Error response
    console.log(error);
  }
});

// Update a prescription by ID
router.patch("/:prescriptionId", async (req, res) => {
  const id = req.params.prescriptionId; // Get the prescription ID from the request
  const payload = req.body; // Get the updated payload
  try {
    const prescription = await PrescriptionModel.findByIdAndUpdate(
      { _id: id },
      payload,
      { new: true } // Return the updated document
    );
    if (!prescription) {
      res.status(404).send({ msg: `Prescription with id ${id} not found` });
    } else {
      res.status(200).send(`Prescription with id ${id} updated`); // Success response
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

// Delete a prescription by ID
router.delete("/:prescriptionId", async (req, res) => {
  const id = req.params.prescriptionId; // Get the prescription ID from the request
  try {
    const prescription = await PrescriptionModel.findByIdAndDelete(id); // Delete the prescription
    if (!prescription) {
      res.status(404).send({ msg: `Prescription with id ${id} not found` });
    } else {
      res.status(200).send(`Prescription with id ${id} deleted`); // Success response
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

// Export the prescription routes
module.exports = router;
