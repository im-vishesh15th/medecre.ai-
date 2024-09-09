// const mongoose = require("mongoose");

// const doctorSchema = mongoose.Schema({
//   userType: {
//     type: String,
//     default: "doctor",
//   },

//   docID: {
//     type: Number,
//     required: true,
//   },

//   docName: {
//     type: String,
//   },

//   mobile: {
//     type: Number,
//   },

//   email: {
//     type: String,
//   },

//   password: {
//     type: String,
//     required: true,
//   },

//   age: {
//     type: Number,
//   },

//   gender: {
//     type: String,
//   },

//   bloodGroup: {
//     type: String,
//   },

//   DOB: {
//     type: Date,
//   },

//   address: {
//     type: String,
//   },

//   education: {
//     type: String,
//   },

//   department: {
//     type: String,
//   },

//   image: {
//     type: String,
//     default:
//       "https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg",
//   },

//   details: {
//     type: String,
//   },
// });

// const DoctorModel = mongoose.model("doctor", doctorSchema);

// module.exports = { DoctorModel };


// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const doctorSchema = new Schema({
//   name: { type: String, required: true },
//   specialization: { type: String, required: true },
//   email: { type: String, required: true },
//   contactInfo: {
//     phone: { type: String, required: true },
   
//   },
//   appointments: [
//     {
//       appointmentId: { type: Schema.Types.ObjectId, ref: 'Appointment' },
//       date: { type: Date },
//       patientId: { type: Schema.Types.ObjectId, ref: 'Patient' }
//     }
//   ],
//   prescriptions: [
//     { type: Schema.Types.ObjectId, ref: 'Prescription' }
//   ],
//   reports: [
//     { type: Schema.Types.ObjectId, ref: 'Report' }
//   ]
// });

// module.exports = mongoose.model('DoctorModel', doctorSchema);
const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
  userType: {
    type: String,
    default: "doctor",
  },

  docID: {
    type: Number,
    required: true,
  },

  docName: {
    type: String,
  },

  mobile: {
    type: Number,
  },

  email: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
  },

  gender: {
    type: String,
  },

  bloodGroup: {
    type: String,
  },

  DOB: {
    type: Date,
  },

  address: {
    type: String,
  },

  education: {
    type: String,
  },

  department: {
    type: String,
  },

  image: {
    type: String,
    default:
      "https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg",
  },

  details: {
    type: String,
  },
});

const DoctorModel = mongoose.model("doctor", doctorSchema);

module.exports = { DoctorModel };

