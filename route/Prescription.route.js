// const express = require("express");
// const { PrescriptionModel } = require("../models/Prescription.model");

// const router = express.Router();

// router.get("/", async (req, res) => {
//   let query = req.query;
//   try {
//     const prescriptions = await PrescriptionModel.find(query);
//     res.status(200).send(prescriptions);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: "Something went wrong" });
//   }
// });

// router.post("/create", async (req, res) => {
//   const payload = req.body;
//   try {
//     const prescription = new PrescriptionModel(payload);
//     await prescription.save();
//   } catch (error) {
//     res.send("Error occurred, unable to create a prescription.");
//     console.log(error);
//   }
//   res.send("Prescription successfully created.");
// });

// router.patch("/:prescriptionId", async (req, res) => {
//   const id = req.params.prescriptionId;
//   const payload = req.body;
//   try {
//     const prescription = await PrescriptionModel.findByIdAndUpdate(
//       { _id: id },
//       payload
//     );
//     if (!prescription) {
//       res.status(404).send({ msg: `Prescription with id ${id} not found` });
//     }
//     res.status(200).send(`Prescription with id ${id} updated`);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: "Something went wrong, unable to Update." });
//   }
// });

// router.delete("/:prescriptionId", async (req, res) => {
//   const id = req.params.prescriptionId;
//   try {
//     const prescription = await PrescriptionModel.findByIdAndDelete({ _id: id });
//     if (!prescription) {
//       res.status(404).send({ msg: `Prescription with id ${id} not found` });
//     }
//     res.status(200).send(`Prescription with id ${id} deleted`);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: "Something went wrong, unable to Delete." });
//   }
// });

// module.exports = router;

const express = require("express");
const { PrescriptionModel } = require("../models/Prescription.model");

const router = express.Router();

// Get all prescriptions with optional query parameters
router.get("/", async (req, res) => {
  const query = req.query;
  try {
    const prescriptions = await PrescriptionModel.find(query);
    res.status(200).json(prescriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Unable to fetch prescriptions." });
  }
});

// Create a new prescription
router.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const newPrescription = new PrescriptionModel(payload);
    await newPrescription.save();
    res.status(201).json({ message: "Prescription successfully created.", prescription: newPrescription });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error occurred, unable to create a prescription." });
  }
});

// Update an existing prescription
router.patch("/:prescriptionId", async (req, res) => {
  const id = req.params.prescriptionId;
  const payload = req.body;
  try {
    const updatedPrescription = await PrescriptionModel.findByIdAndUpdate(id, payload, { new: true });

    if (!updatedPrescription) {
      return res.status(404).json({ message: `Prescription with id ${id} not found` });
    }

    res.status(200).json({ message: "Prescription updated successfully", prescription: updatedPrescription });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error occurred, unable to update the prescription." });
  }
});

// Delete a prescription
router.delete("/:prescriptionId", async (req, res) => {
  const id = req.params.prescriptionId;
  try {
    const deletedPrescription = await PrescriptionModel.findByIdAndDelete(id);

    if (!deletedPrescription) {
      return res.status(404).json({ message: `Prescription with id ${id} not found` });
    }

    res.status(200).json({ message: `Prescription with id ${id} deleted` });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error occurred, unable to delete the prescription." });
  }
});

module.exports = router;
