
const mongoose = require("mongoose");

// Define the report schema
const reportSchema = mongoose.Schema({
  docName: {
    type: String,
    required: true, // Doctor's name is required
  },

  docDepartment: {
    type: String,
    required: true, // Doctor's department is required
  },

  docMobile: {
    type: Number,
    required: true, // Doctor's mobile number is required
  },

  medicines: [
    {
      medName: {
        type: String, // Name of the medicine
      },
      dosage: {
        type: Number, // Dosage amount
      },
      duration: {
        type: String, // Duration of the medicine
      },
    },
  ],

  extrainfo: {
    type: String, // Extra information if needed
  },

  patientName: {
    type: String,
    required: true, // Patient's name is required
  },

  patientAge: {
    type: Number,
    required: true, // Patient's age is required
  },

  email: {
    type: String,
    required: true, // Patient's email is required
  },

  patientGender: {
    type: String,
    required: true, // Patient's gender is required
  },

  patientMobile: {
    type: Number,
    required: true, // Patient's mobile number is required
  },

  patientBloodGroup: {
    type: String,
    required: true, // Patient's blood group is required
  },

  patientDisease: {
    type: String, // Patient's disease
  },

  patientTemperature: {
    type: Number, // Patient's temperature
  },

  patientWeight: {
    type: Number, // Patient's weight
  },

  patientBP: {
    type: Number, // Patient's blood pressure
  },

  patientGlucose: {
    type: Number, // Patient's glucose level
  },

  date: {
    type: String, // Date of report (can be Date type)
  },

  time: {
    type: String, // Time of report
  },
});

// Create a Report model based on the report schema
const ReportModel = mongoose.model("report", reportSchema);

// Export the Report model
module.exports = { ReportModel };
