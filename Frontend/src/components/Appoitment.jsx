import React, { useState, useEffect, useContext } from 'react';
import {
  ChevronRight,
  AlertTriangle,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  

} from 'lucide-react';
import { HealthContext } from '../context/HealthContext';
import { useNavigate } from "react-router-dom";
import videoBackground from '../assets/141412-777708076_tiny.mp4'; // Correct relative path to your video


const styles = {

  container: {
    minHeight: '100vh',
    width: '100%',
    margin: 0,
    padding: 0,
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#f0f8ff',
    overflowX: 'hidden',
  },
  header: {
    backgroundColor: 'black',
    color: '#4fd1c5',
    padding: '20px',
    textAlign: 'center',
    position: 'relative',
    zIndex: '10'
  },
  emergencyButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: '#e74c3c',
    color: '#4fd1c5',
    border: 'none',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    fontSize: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '50%',
    margin: "auto",
    height: '100%',
    textAlign: "center",
    marginTop: "20px",

  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  icon: {
    marginRight: '10px',
    color: '#4a90e2',
  },
  input: {
    flex: 1,
    border: 'none',
    fontSize: '16px',
    outline: 'none',
    width: '100%',
    padding: '5px'
  },
  button: {
    padding: '15px 30px',
    fontSize: '18px',
    backgroundColor: '#4fd1c5',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1'
  },
  symptomButton: {
    padding: '10px 15px',
    margin: '5px',
    backgroundColor: 'white',
    border: '2px solid #4a90e2',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  selectedSymptom: {
    backgroundColor: '#4a90e2',
    color: 'white',
  },
  symptomsContainer: {
    height: '300px',
    overflowY: 'scroll',
    border: '1px solid #4a90e2',
    borderRadius: '10px',
    padding: '10px',
    backgroundColor: 'white',
  },

  error: {
    color: '#e74c3c',
    marginTop: '10px',
    fontWeight: 'bold',
  },


  suggestionBox: {
    backgroundColor: 'white',
    border: '1px solid #4a90e2',
    borderRadius: '10px',
    padding: '20px',
    marginTop: '30px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  roundIndicatorContainer: {
    position: 'absolute',
    right: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundIndicator: (accuracy) => ({
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: `conic-gradient(#4a90e2 ${accuracy}%, #ddd ${accuracy}% 100%)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    color: 'white',
  }),
  roundIndicatorText: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  diseaseBox: {
    backgroundColor: 'white',
    border: '1px solid #4a90e2',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  specialisationList: {
    listStyle: 'none',
    padding: 0,
    margin: '10px 0 0 0',
    fontSize: '16px',
    color: '#555',
  },
  specialisationItem: {
    marginBottom: '5px',
  },
  actionButtonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  actionButton: {
    padding: '15px 30px',
    fontSize: '18px',
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoCallButton: {
    backgroundColor: '#e67e22',
  },

  dialogOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  dialogBox: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    height: '500px',
    width: '700px',
    maxHeight: '80vh',
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column'
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    padding: '10px',
    marginTop: '10px',

  }

};

export default function ComprehensiveAppointmentPage() {
  const navigate = useNavigate();

  const { symptoms, predictedDiseases, fetchDiseasePrediction, loading, aiinfo } = useContext(HealthContext);
  const [step, setStep] = useState(0);
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    age: '',
    sex: '',
    address: '',
    phone: '',
    email: '',
  });
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [symptomDescription, setSymptomDescription] = useState('');
  const [error, setError] = useState('');

  const [infoDialogOpen, setInfoDialogOpen] = useState(false);// To control dialog visibility
  
  const [diseaseInfo, setDiseaseInfo] = useState(''); // To store fetched info content
  const [selectedDiseaseName, setSelectedDiseaseName] = useState(''); // To store the name of the disease


  const handleDiseaseInfo = async (disease) => {
    console.log(disease);
    // Fetch disease info (or mock it for now)
    const data=await aiinfo(disease.Issue.Name);
    console.log(data);
    setDiseaseInfo(data)
    setSelectedDiseaseName(disease.Issue.Name); // Set the name of the disease
    setInfoDialogOpen(true); // Open the dialog
  };

  const closeDialog = () => {
    setInfoDialogOpen(false);
  };

  useEffect(() => {
    if (step === 4 && selectedSymptoms.length > 0) {
      fetchDiseasePrediction(selectedSymptoms, patientDetails.sex, 2004);
    }
  }, [step]);

  const handleEmergencyBooking = () => {
    alert('Initiating emergency appointment process. Please stand by for immediate assistance.');
  };

  const handlePatientDetailsSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['name', 'age', 'sex', 'phone', 'email'];
    const missingFields = requiredFields.filter(field => !patientDetails[field]);
    if (missingFields.length > 0) {
      setError(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }
    setError('');
    setStep(2);
  };

  const handleSymptomSelection = (symptomId) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleSymptomDescriptionSubmit = (e) => {
    e.preventDefault();
    if (selectedSymptoms.length === 0 && !symptomDescription) {
      setError('Please select symptoms or describe your condition');
      return;
    }
    setError('');
    setStep(4);
  };

  const handleBookAppointment = () => {
    alert('Booking an appointment...');
    navigate("/GetAppointment")
  };

  const handleApplyVideoCall = () => {
    alert('Applying for a video call...');
  };

  const renderStep = () => {
    const renderBackButton = step > 0 && (
      <button
        style={{
          padding: '15px 30px',
          fontSize: '18px',
          backgroundColor: '#4fd1c5',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '50%',
          margin: 'auto',
          marginTop: '30px',

        }}
        onClick={() => setStep(step - 1)}
      >
        Back
      </button>
    );
    switch (step) {
      case 0:
        return (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '93vh',
            width: '100%',
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',

            color: '#4fd1c5',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          }}>
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              src={videoBackground}
              autoPlay
              loop
              muted
              style={
                {
                  top: '0',
                  right: 0,
                  width: '100%',
                  position: 'absolute',
                  zIndex: '1'
                }
              }
            ></video>
            <h1 style={{ fontSize: '3rem', marginBottom: '20px', zIndex: '1', color: 'white' }}>Welcome to Our Advanced Medical Appointment System</h1>
            <p style={{ fontSize: '1.2rem', maxWidth: '600px', zIndex: '1', color: 'white', marginBottom: '40px' }}>
              Your health is our priority. Whether you need a routine check-up or urgent care, we're here to help.
            </p>
            <button onClick={() => setStep(1)} style={{
              zIndex: 1,
              padding: '15px 30px',
              fontSize: '18px',
              borderRadius: '10px'
            }} className="bg-teal-400 text-white px-4 py-2 font-bold flex items-center gap-2 rounded hover:bg-teal-300 transition-transform transform hover:scale-105"
            >
              Start Booking
            </button>

          </div>
        );


      case 1:
        return (
          <form onSubmit={handlePatientDetailsSubmit} style={styles.form} >
            <h2>Patient Details</h2>
            <div style={styles.inputGroup}>
              <User style={styles.icon} />
              <input
                type="text"
                placeholder="Full Name"
                value={patientDetails.name}
                onChange={(e) => setPatientDetails({ ...patientDetails, name: e.target.value })}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <Calendar style={styles.icon} />
              <input
                type="number"
                placeholder="Age"
                value={patientDetails.age}
                onChange={(e) => setPatientDetails({ ...patientDetails, age: e.target.value })}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <User style={styles.icon} />
              <select
                value={patientDetails.sex}
                onChange={(e) => setPatientDetails({ ...patientDetails, sex: e.target.value })}
                style={{ ...styles.input, backgroundColor: 'transparent' }}
              >
                <option value="">Select Sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <MapPin style={styles.icon} />
              <input
                type="text"
                placeholder="Address"
                value={patientDetails.address}
                onChange={(e) => setPatientDetails({ ...patientDetails, address: e.target.value })}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <Phone style={styles.icon} />
              <input
                type="tel"
                placeholder="Phone Number"
                value={patientDetails.phone}
                onChange={(e) => setPatientDetails({ ...patientDetails, phone: e.target.value })}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <Mail style={styles.icon} />
              <input
                type="text"
                placeholder="Email Address"
                value={patientDetails.email}
                onChange={(e) => setPatientDetails({ ...patientDetails, email: e.target.value })}
                style={styles.input}
              />
            </div>
            {error && <div style={styles.error}>{error}</div>}

            <button type="submit" style={styles.button}>Continue to Symptoms Selection</button>
            {renderBackButton}
          </form>
        );

      case 2: // Symptom Selection Page
        return (
          <div style={styles.content}>
            <h2>Select Your Symptoms</h2>
            <div style={styles.symptomsContainer}>
              {symptoms.map((symptom) => (
                <button
                  key={symptom.ID}
                  style={{
                    ...styles.symptomButton,
                    ...(selectedSymptoms.includes(symptom.ID) ? styles.selectedSymptom : {}),
                  }}
                  onClick={() => handleSymptomSelection(symptom.ID)}
                >
                  {symptom.Name}
                </button>
              ))}
            </div>
            <div style={{ marginTop: '20px' }}>
              <button style={styles.button} onClick={() => setStep(3)}>Next</button>
              {renderBackButton}
            </div>
          </div>
        );
      case 3: // Symptom Description Page
        return (
          <div style={styles.content}>
            <h2>Describe Your Symptoms</h2>
            <textarea
              rows="6"
              placeholder="Describe your symptoms or condition in detail..."
              style={{
                flex: 1,
                border: 'none',
                fontSize: '16px',
                outline: 'none',
                width: '100%',
                padding: '5px',
                minHeight: '300px'
              }}
              value={symptomDescription}
              onChange={(e) => setSymptomDescription(e.target.value)}
            />
            {error && <p style={styles.error}>{error}</p>}
            <div style={{ marginTop: '20px' }}>
              <button style={styles.button} onClick={handleSymptomDescriptionSubmit}>Next</button>
              {renderBackButton}
            </div>
          </div>
        );
      case 4: // Disease Prediction Page
        return (
          <div style={{ textAlign: 'center', marginTop: '50px', width: '50%', margin: 'auto' }}>
            <h2>Disease Suggestions</h2>
            {loading ? (
              <p>Loading disease predictions...</p>
            ) : predictedDiseases?.length > 0 ? (
              <div style={styles.suggestionBox}>
                <p>Based on your symptoms, you might have:</p>
                {predictedDiseases.map((disease, index) => (
                  <div key={index} style={styles.diseaseBox}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <div style={styles.roundIndicatorContainer}>
                        <div style={styles.roundIndicator(disease.Issue.Accuracy)}>
                          <span style={styles.roundIndicatorText}>
                            {disease.Issue.Accuracy.toFixed(0)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <strong>{disease.Issue.Name}</strong>
                      </div>
                    </div>
                    <ul style={styles.specialisationList}>
                      {disease.Specialisation.map((specialist, specIndex) => (
                        <li key={specIndex} style={styles.specialisationItem}>
                          Specialization: {specialist.Name}
                        </li>
                      ))}
                    </ul>
                    {/* Add the Info button */}
                    <button
                      style={styles.button}
                      onClick={() => handleDiseaseInfo(disease)}
                    >
                      Info
                    </button>
                  </div>
                ))}
                <p>Please consult a healthcare provider for a definitive diagnosis.</p>
                <div style={styles.actionButtonContainer}>
                  <button style={styles.actionButton} onClick={handleBookAppointment}>
                    Book Appointment
                  </button>
                  <button style={{ ...styles.actionButton, ...styles.videoCallButton }} onClick={handleApplyVideoCall}>
                    Apply for Video Call
                  </button>
                </div>
              </div>
            ) : (
              <p>No diseases could be predicted based on the selected symptoms.
                <p>Please consult a healthcare provider for a definitive diagnosis.</p>
                <div style={styles.actionButtonContainer}>
                  <button style={styles.actionButton} onClick={handleBookAppointment}>
                    Book Appointment
                  </button>
                  <button style={{ ...styles.actionButton, ...styles.videoCallButton }} onClick={handleApplyVideoCall}>
                    Apply for Video Call
                  </button>
                </div>
                {renderBackButton}
              </p>

            )}
          </div>
        );
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Medical Appointment System</h1>
        <button style={styles.emergencyButton} onClick={handleEmergencyBooking}>
          <AlertTriangle size={24} />
        </button>
      </header>
      {renderStep()}
      {infoDialogOpen  && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-hidden">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Info</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-teal-100 dark:bg-teal-800 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 text-teal-800 dark:text-teal-200">Home Remedies:</h3>
                <ul className="list-disc pl-5 text-teal-700 dark:text-teal-300">
                  {/* <li>Rest and sleep</li>
                  <li>Stay hydrated with water and warm liquids</li>
                  <li>Gargle with salt water</li>
                  <li>Use a humidifier</li>
                  <li>Try over-the-counter pain relievers</li> */}
                      <div dangerouslySetInnerHTML={{ __html: diseaseInfo.reply1.substring(7,diseaseInfo.reply1.length-3) }} />

                </ul>
              </div>
              <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 text-blue-800 dark:text-blue-200">Diet Suggestions:</h3>
                <ul className="list-disc pl-5 text-blue-700 dark:text-blue-300">
                <div dangerouslySetInnerHTML={{ __html: diseaseInfo.reply2.substring(7,diseaseInfo.reply2.length-3) }} />
                </ul>
              </div>
              <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 text-red-800 dark:text-red-200">When to See a Doctor:</h3>
                <p className="text-red-700 dark:text-red-300 flex items-start">
                  <AlertTriangle className="inline mr-2 flex-shrink-0" size={20} />
                  <div dangerouslySetInnerHTML={{ __html: diseaseInfo.reply3.substring(7,diseaseInfo.reply3.length-3) }} />
                </p>
              </div>
            </div>
            <button
              onClick={closeDialog}
              className="mt-6 w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


