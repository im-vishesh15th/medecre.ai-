import React, { useState, useEffect } from 'react'
import { ChevronRight, AlertTriangle, User, MapPin, Phone, Mail, Calendar } from 'lucide-react'

const styles = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#f0f8ff',
    overflowX: 'hidden',
  },
  header: {
    backgroundColor: '#4a90e2',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
    position: 'relative',
  },
  emergencyButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: '#e74c3c',
    color: 'white',
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
  },
  button: {
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
  suggestionBox: {
    backgroundColor: 'white',
    border: '1px solid #4a90e2',
    borderRadius: '10px',
    padding: '20px',
    marginTop: '30px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  error: {
    color: '#e74c3c',
    marginTop: '10px',
    fontWeight: 'bold',
  },
}

const predefinedSymptoms = [
  { id: 1, name: 'Fever' },
  { id: 2, name: 'Cough' },
  { id: 3, name: 'Headache' },
  { id: 4, name: 'Fatigue' },
  { id: 5, name: 'Shortness of breath' },
  { id: 6, name: 'Nausea' },
  { id: 7, name: 'Dizziness' },
  { id: 8, name: 'Chest pain' },
]

export default function ComprehensiveAppointmentPage() {
  const [step, setStep] = useState(0)
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    age: '',
    sex: '',
    address: '',
    phone: '',
    email: '',
    dob: '',
  })
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [symptomDescription, setSymptomDescription] = useState('')
  const [diseaseSuggestions, setDiseaseSuggestions] = useState([])
  const [severity, setSeverity] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDiseaseSuggestions = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const suggestions = ['Common Cold', 'Flu', 'Allergies', 'COVID-19', 'Pneumonia', 'Migraine', 'Gastroenteritis']
      setDiseaseSuggestions(suggestions.sort(() => 0.5 - Math.random()).slice(0, 3))
    }

    if (step > 0) {
      fetchDiseaseSuggestions()
    }
  }, [step])

  const handleEmergencyBooking = () => {
    alert('Initiating emergency appointment process. Please stand by for immediate assistance.')
  }

  const handlePatientDetailsSubmit = (e) => {
    e.preventDefault()
    const requiredFields = ['name', 'age', 'sex', 'phone', 'email']
    const missingFields = requiredFields.filter(field => !patientDetails[field])
    if (missingFields.length > 0) {
      setError(`Please fill in the following required fields: ${missingFields.join(', ')}`)
      return
    }
    setError('')
    setStep(2)
  }

  const handleSymptomSelection = (symptomId) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    )
  }

  const handleSymptomDescriptionSubmit = (e) => {
    e.preventDefault()
    if (selectedSymptoms.length === 0 && !symptomDescription) {
      setError('Please select symptoms or describe your condition')
      return
    }
    setError('')
    setStep(4)
    setTimeout(() => {
      const randomSeverity = Math.random()
      if (randomSeverity < 0.3) {
        setSeverity('normal')
      } else if (randomSeverity < 0.7) {
        setSeverity('mild')
      } else {
        setSeverity('serious')
      }
      setStep(5)
    }, 2000)
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: 'calc(100vh - 100px)',
            textAlign: 'center',
            backgroundImage: 'url(/placeholder.svg?height=400&width=800)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Welcome to Our Advanced Medical Appointment System</h1>
            <p style={{ fontSize: '1.2rem', maxWidth: '600px', marginBottom: '40px' }}>
              Your health is our priority. Whether you need a routine check-up or urgent care, we're here to help.
            </p>
            <button style={{...styles.button, fontSize: '1.2rem'}} onClick={() => setStep(1)}>
              Start Appointment Process <ChevronRight size={24} />
            </button>
          </div>
        )
      case 1:
        return (
          <form onSubmit={handlePatientDetailsSubmit} style={styles.form}>
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
                style={{...styles.input, backgroundColor: 'transparent'}}
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
                type="email"
                placeholder="Email Address"
                value={patientDetails.email}
                onChange={(e) => setPatientDetails({ ...patientDetails, email: e.target.value })}
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.button}>Next <ChevronRight size={24} /></button>
            {error && <div style={styles.error}>{error}</div>}
          </form>
        )
      case 2:
        return (
          <div>
            <h2>Select Your Symptoms</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {predefinedSymptoms.map(symptom => (
                <button
                  key={symptom.id}
                  onClick={() => handleSymptomSelection(symptom.id)}
                  style={{
                    ...styles.symptomButton,
                    ...(selectedSymptoms.includes(symptom.id) ? styles.selectedSymptom : {}),
                  }}
                >
                  {symptom.name}
                </button>
              ))}
            </div>
            <h2>Or Describe Your Condition</h2>
            <form onSubmit={handleSymptomDescriptionSubmit} style={styles.form}>
              <textarea
                placeholder="Describe your symptoms here"
                value={symptomDescription}
                onChange={(e) => setSymptomDescription(e.target.value)}
                rows="4"
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  border: '1px solid #ddd',
                  fontSize: '16px',
                }}
              />
              <button type="submit" style={styles.button}>Submit Symptoms <ChevronRight size={24} /></button>
            </form>
            {error && <div style={styles.error}>{error}</div>}
          </div>
        )
      case 3:
        return (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Please Wait</h2>
            <p>We are analyzing your symptoms to suggest possible conditions...</p>
          </div>
        )
      case 4:
        return (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Disease Suggestions</h2>
            <div style={styles.suggestionBox}>
              <p>Based on your symptoms, you might have:</p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {diseaseSuggestions.map((disease, index) => (
                  <li key={index} style={{ margin: '10px 0', fontSize: '18px' }}>{disease}</li>
                ))}
              </ul>
              <p>Please consult a healthcare provider for a definitive diagnosis.</p>
            </div>
          </div>
        )
      case 5:
        return (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            {severity === 'serious' ? (
              <div style={{ ...styles.suggestionBox, backgroundColor: '#fdecea' }}>
                <AlertTriangle style={{ color: '#e74c3c', marginBottom: '10px' }} />
                <h2>Urgent Attention Required</h2>
                <p>Your symptoms indicate a potentially serious condition.</p>
                <button style={{...styles.button, backgroundColor: '#e74c3c'}} onClick={() => alert('Redirecting to emergency services.')}>
                  Seek Immediate Help
                </button>
              </div>
            ) : severity === 'mild' ? (
              <div style={{ ...styles.suggestionBox, backgroundColor: '#fff3cd' }}>
                <h2>Consult a Doctor</h2>
                <p>Your symptoms suggest a condition that should be evaluated by a healthcare professional soon.</p>
                <button style={styles.button} onClick={() => alert('Booking a consultation.')}>
                  Book a Consultation
                </button>
              </div>
            ) : (
              <div style={{ ...styles.suggestionBox, backgroundColor: '#d4edda' }}>
                <h2>Low Severity</h2>
                <p>Your symptoms do not indicate any serious conditions at the moment.</p>
                <button style={styles.button} onClick={() => alert('Schedule a check-up.')}>
                  Schedule a Check-Up
                </button>
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Medical Appointment System</h1>
        <button style={styles.emergencyButton} onClick={handleEmergencyBooking}>
          <AlertTriangle size={32} />
        </button>
      </header>
      <main style={styles.content}>
        {renderStep()}
      </main>
    </div>
  )
}
