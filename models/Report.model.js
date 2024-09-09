// const mongoose = require("mongoose");

// const reportSchema = mongoose.Schema({
//   docName: {
//     type: String,
//     required: true,
//   },

//   docDepartment: {
//     type: String,
//     required: true,
//   },

//   docMobile: {
//     type: Number,
//     required: true,
//   },

//   medicines: [
//     {
//       medName: {
//         type: String,
//       },
//       dosage: {
//         type: Number,
//       },
//       duration: {
//         type: String,
//       },
//     },
//   ],

//   patientName: {
//     type: String,
//     required: true,
//   },

//   patientAge: {
//     type: Number,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   patientGender: {
//     type: String,
//     required: true,
//   },

//   patientMobile: {
//     type: Number,
//     required: true,
//   },

//   patientBloodGroup: {
//     type: String,
//     required: true,
//   },

//   patientDisease: {
//     type: String,
//   },

//   patientTemperature: {
//     type: Number,
//   },

//   patientWeight: {
//     type: Number,
//   },

//   patientBP: {
//     type: Number,
//   },

//   patientGlucose: {
//     type: Number,
//   },

//   date: {
//     type: String,
//   },

//   time: {
//     type: String,
//   },
// });

// const ReportModel = mongoose.model("report", reportSchema);

// module.exports = { ReportModel };

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  reportType: { type: String, required: true },
  results: { type: String, required: true },
  notes: { type: String }
});

module.exports = mongoose.model('ReportModel', reportSchema);
