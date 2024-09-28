

const mongoose = require("mongoose");

// Define the prescription schema
const prescriptionSchema = mongoose.Schema({
  docName: {
    type: String,
    required: true, // Doctor's name is required
  },

  hospital: {
    name: {
      type: String,
      required: true, // Hospital name is required
    },
    address: {
      street: {
        type: String,
        required: true, // Street address is required
      },
      city: {
        type: String,
        required: true, // City is required
      },
      state: {
        type: String,
        required: true, // State is required
      },
      pincode: {
        type: Number,
        required: true, // Pincode is required
      },
    },
    phone: {
      type: Number,
      required: true, // Phone number is required
      minlength: 11, // Phone number must be at least 11 digits
    },
  },

  medicines: {
    diagnosis: {
      type: String, // Diagnosis details
    },
    medicineName: {
      type: String,
      required: true, // Medicine name is required
    },
    type: {
      type: String,
      required: true, // Type of medicine is required
    },
    dosage: {
      quantity: {
        type: Number,
        required: true, // Dosage quantity is required
      },
      duration: {
        type: Number,
        required: true, // Duration of medication is required
      },
    },
  },

  advice: {
    type: String, // Additional advice from the doctor
  },

  total: {
    type: Number,
    required: true, // Total cost of the prescription is required
  },
});

// Create a Prescription model based on the prescription schema
const PrescriptionModel = mongoose.model("prescription", prescriptionSchema);

// Export the Prescription model
module.exports = { PrescriptionModel, prescriptionSchema };
