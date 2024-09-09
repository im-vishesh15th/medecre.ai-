// const express = require("express");
// const { ReportModel } = require("../models/Report.model");

// const router = express.Router();

// router.get("/", async (req, res) => {
//   let query = req.query;
//   try {
//     const reports = await ReportModel.find(query);
//     res.status(200).send(reports);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: "Something went wrong" });
//   }
// });

// router.post("/create", async (req, res) => {
//   const payload = req.body;
//   try {
//     const report = new ReportModel(payload);
//     await report.save();
//     res.send({ message: "Report successfully created", report });
//   } catch (error) {
//     res.send(error);
//   }
// });

// router.patch("/:reportId", async (req, res) => {
//   const id = req.params.reportId;
//   const payload = req.body;
//   try {
//     const report = await ReportModel.findByIdAndUpdate({ _id: id }, payload);
//     if (!report) {
//       res.status(404).send({ msg: `Report with id ${id} not found` });
//     }
//     res.status(200).send(`Report with id ${id} updated`);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: "Something went wrong, unable to Update." });
//   }
// });

// router.delete("/:reportId", async (req, res) => {
//   const id = req.params.reportId;
//   try {
//     const report = await ReportModel.findByIdAndDelete({ _id: id });
//     if (!report) {
//       res.status(404).send({ msg: `Report with id ${id} not found` });
//     }
//     res.status(200).send(`Report with id ${id} deleted`);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: "Something went wrong, unable to Delete." });
//   }
// });

// module.exports = router;

const express = require("express");
const { ReportModel } = require("../models/Report.model");

const router = express.Router();

// Get all reports with optional query parameters
router.get("/", async (req, res) => {
  const query = req.query;
  try {
    const reports = await ReportModel.find(query);
    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Unable to fetch reports." });
  }
});

// Create a new report
router.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const newReport = new ReportModel(payload);
    await newReport.save();
    res.status(201).json({ message: "Report successfully created", report: newReport });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error occurred, unable to create the report." });
  }
});

// Update an existing report
router.patch("/:reportId", async (req, res) => {
  const id = req.params.reportId;
  const payload = req.body;
  try {
    const updatedReport = await ReportModel.findByIdAndUpdate(id, payload, { new: true });

    if (!updatedReport) {
      return res.status(404).json({ message: `Report with id ${id} not found` });
    }

    res.status(200).json({ message: "Report updated successfully", report: updatedReport });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error occurred, unable to update the report." });
  }
});

// Delete a report
router.delete("/:reportId", async (req, res) => {
  const id = req.params.reportId;
  try {
    const deletedReport = await ReportModel.findByIdAndDelete(id);

    if (!deletedReport) {
      return res.status(404).json({ message: `Report with id ${id} not found` });
    }

    res.status(200).json({ message: `Report with id ${id} deleted` });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error occurred, unable to delete the report." });
  }
});

module.exports = router;
