// const mongoose = require("mongoose");

// const patientSchema = mongoose.Schema({
//   userType: {
//     type: String,
//     default: "patient",
//   },

//   patientID: {
//     type: Number,
//     required: true,
//   },

//   patientName: {
//     type: String,
//   },

//   mobile: {
//     type: Number,
//     minlength: 10,
//   },

//   email: {
//     type: String,
//   },

//   password: {
//     type: String,
//     default: "password",
    
//   },

//   age: {
//     type: Number,
//   },

//   department: {
//     type: String,
//   },

//   gender: {
//     type: String,
//   },

//   bloodGroup: {
//     type: String,
//   },

//   DOB: {
//     type: String,
//   },

//   address: {
//     type: String,
//   },

//   image: {
//     type: String,
//   },

//   disease: {
//     type: String,
//   },

//   details: {
//     type: String,
//   },

//   admitted: {
//     type: Boolean,
//     default: true,
//   },

//   date: {
//     type: Date,
//   },

//   docID: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "doctor",
//   },

// });

// const PatientModel = mongoose.model("patient", patientSchema);

// module.exports = { PatientModel };


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  contactInfo: {
    phone: { type: String, required: true },
    email: { type: String, required: true }
  },
  address: { type: String },
  appointments: [
    {
      appointmentId: { type: Schema.Types.ObjectId, ref: 'Appointment' },
      date: { type: Date },
      doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor' }
    }
  ],
  prescriptions: [
    { type: Schema.Types.ObjectId, ref: 'Prescription' }
  ],
  reports: [
    { type: Schema.Types.ObjectId, ref: 'Report' }
  ]
});

module.exports = mongoose.model('PatientModel', patientSchema);
