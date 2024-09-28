const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  userType: {
    type: String,
    default: "admin",
  },

  adminID: {
    type: Number,
    required: true,
  },

  adminName: {
    type: String,
  },

  email: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
  },

  age: {
    type: Number,
  },

  mobile: {
    type: Number,
    minlength: 10,
  },

  DOB: {
    type: String,
  },

  education: {
    type: String,
  },

  image: {
    type: String,
    default:
      "https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg",
  },

  // Array of doctors referring to the DoctorModel
  doctors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctorSchema",  // Reference to DoctorModel
  }],

  // Array of patients referring to the PatientModel
  patients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "patientSchema",  // Reference to PatientModel
  }]
});

const AdminModel = mongoose.model("admin", adminSchema);

module.exports = { AdminModel };
