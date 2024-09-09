// const mongoose = require("mongoose");

// const appointmentSchema = mongoose.Schema({
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
//   },
  
//   email: {
//     type: String,
//   },

//   address: {
//     type: String,
//   },

//   disease: {
//     type: String,
//   },

//   department: {
//     type: String,
//   },

//   time: {
//     type: String,
//   },

//   date: {
//     type: String,
//   },

//   age: {
//     type: Number,
//     required: true,
//   },

//   gender: {
//     type: String,
//     required: true,
//   },
  
// },{timestamps:true}
// );

// const AppointmentModel = mongoose.model("appointment", appointmentSchema);

// module.exports = { AppointmentModel };

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  reason: { type: String },
  status: { type: String, enum: ['scheduled', 'completed', 'canceled'], default: 'scheduled' }
});

module.exports = mongoose.model('AppointmentModel', appointmentSchema);
