

const mongoose = require("mongoose");

// Define the patient schema
const patientSchema = mongoose.Schema({
  userType: {
    type: String,
    default: "patient", // Default user type is 'patient'
  },

  patientID: {
    type: Number,
    required: true, // Patient ID is required
  },

  patientName: {
    type: String, // Name of the patient
  },

  mobile: {
    type: Number,
    minlength: 10, // Mobile number must be at least 10 digits
  },

  email: {
    type: String, // Email of the patient
  },

  password: {
    type: String,
    default: "password", // Default password is 'password'
  },

  age: {
    type: Number, // Age of the patient
  },

  gender: {
    type: String, // Gender of the patient
  },

  height: {
    type: Number, // Height of the patient
  },

  weight: {
    type: Number, // Weight of the patient
  },

  // Vital signs
  bloodPressureSystolic: {
    type: Number, // Systolic blood pressure
  },

  bloodPressureDiastolic: {
    type: Number, // Diastolic blood pressure
  },

  heartRate: {
    type: Number, // Heart rate of the patient
  },

  temperature: {
    type: Number, // Body temperature
  },

  // Lifestyle information
  smokingStatus: {
    type: String, // Smoking status (e.g., smoker, non-smoker)
  },

  alcoholConsumption: {
    type: String, // Alcohol consumption details
  },

  exerciseFrequency: {
    type: Number, // Frequency of exercise per week
  },

  sleepHours: {
    type: Number, // Average hours of sleep per night
  },

  stressLevel: {
    type: Number, // Stress level on a scale (e.g., 1-10)
  },

  dietType: {
    type: String, // Type of diet (e.g., vegetarian, non-vegetarian)
  },

  waterIntake: {
    type: String, // Daily water intake (e.g., 2 liters)
  },

  chronicConditions: {
    type: [String], // Array of chronic conditions (e.g., diabetes)
  },

  allergies: {
    type: String, // Any known allergies
  },

  currentMedications: {
    type: String, // Current medications being taken
  },

  familyHistory: {
    type: String, // Family medical history
  },

  currentSymptoms: {
    type: String, // Current symptoms reported by the patient
  },

  department: {
    type: String, // Department the patient is associated with (e.g., cardiology)
  },

  bloodGroup: {
    type: String, // Blood group of the patient
  },

  DOB: {
    type: String, // Date of birth (can be changed to Date type)
  },

  address: {
    type: String, // Residential address of the patient
  },

  image: {
    type: String, // Path or URL to the patient's image
  },

  disease: {
    type: String, // Any diagnosed diseases
  },

  details: {
    type: String, // Additional details about the patient
  },

  admitted: {
    type: Boolean,
    default: true, // Indicates if the patient is currently admitted
  },

  date: {
    type: Date, // Date of registration
  },

  // Reference to the doctor assigned to the patient
  docID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor", // Reference to the doctor model
  },
});

// Create a Patient model based on the patient schema
const PatientModel = mongoose.model("patient", patientSchema);

// Export the Patient model
module.exports = { PatientModel };
