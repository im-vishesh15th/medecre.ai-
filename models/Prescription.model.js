// const mongoose = require("mongoose");

// const prescriptionSchema = mongoose.Schema({
//   docName: {
//     type: String,
//     required: true,
//   },

//   hospital: {
//     name: {
//       type: String,
//       required: true,
//     },
//     address: {
//       street: {
//         type: String,
//         required: true,
//       },
//       city: {
//         type: String,
//         required: true,
//       },
//       state: {
//         type: String,
//         required: true,
//       },
//       pincode: {
//         type: Number,
//         required: true,
//       },
//     },
//     phone: {
//       type: Number,
//       required: true,
//       minlength: 11,
//     },
//   },

//   medicines: {
//     diagnosis: {
//       type: String,
//     },
//     medicineName: {
//       type: String,
//       required: true,
//     },
//     type: {
//       type: String,
//       required: true,
//     },
//     dosage: {
//       quantity: {
//         type: Number,
//         required: true,
//       },
//       duration: {
//         type: Number,
//         required: true,
//       },
//     },
//   },

// });

// const PrescriptionModel = mongoose.model("prescription", prescriptionSchema);

// module.exports = { PrescriptionModel, prescriptionSchema };

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  medications: [
    {
      name: { type: String, required: true },
      dosage: { type: String, required: true }
    }
  ],
  notes: { type: String }
});

module.exports = mongoose.model('PrescriptionModel', prescriptionSchema);
