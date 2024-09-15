

import React, { useState, useEffect, useContext } from 'react'
import { Heart, Activity, Apple, Cigarette, Beer, Moon, Sun, Thermometer, Droplets } from 'lucide-react'
import './HealthForm.css'
import { HealthContext } from '../context/HealthContext'
import { useNavigate } from "react-router-dom";
import PatientDeshboard from './PatientDeshboard';



const HealthAssessmentForm = () => {
  const navigate = useNavigate();
  const { fillform, setfillform } = useContext(HealthContext);

  const [formData, setFormData] = useState({
    // Basic Information
    age: '',
    gender: '',
    height: '',
    weight: '',
    // Vital Signs
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    heartRate: '',
    temperature: '',
    // Lifestyle
    smokingStatus: '',
    alcoholConsumption: '',
    exerciseFrequency: 0,
    sleepHours: 0,
    stressLevel: 0,
    // Diet
    dietType: '',
    waterIntake: '',
    // Medical History
    chronicConditions: [],
    allergies: '',
    currentMedications: '',
    // Family History
    familyHistory: '',
    // Symptoms
    currentSymptoms: '',
  })

  const [progress, setProgress] = useState(0)
  const [activeTab, setActiveTab] = useState('basic')

  useEffect(() => {
    const totalFields = Object.keys(formData).length
    const filledFields = Object.values(formData).filter(value =>
      Array.isArray(value) ? value.length > 0 : value !== ''
    ).length
    setProgress((filledFields / totalFields) * 100)
  }, [formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSliderChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleCheckboxChange = (name, checked) => {
    setFormData(prevData => ({
      ...prevData,
      chronicConditions: checked
        ? [...prevData.chronicConditions, name]
        : prevData.chronicConditions.filter(item => item !== name)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitted health data:', formData)


  }

  const handle = () => {
    navigate("/PatientDeshboard");
    setfillform(true);
    localStorage.setItem('fillform', 1);
    console.log(fillform)
  }

  return (

    <form onSubmit={handleSubmit} className="health-assessment-form">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Comprehensive Health Assessment</h2>
          <p className="card-description">Please provide detailed information about your health for a thorough evaluation</p>
        </div>
        <div className="card-content">
          <div className="tabs">
            <button className={`tab ${activeTab === 'basic' ? 'active' : ''}`} onClick={() => setActiveTab('basic')}>Basic Info</button>
            <button className={`tab ${activeTab === 'vitals' ? 'active' : ''}`} onClick={() => setActiveTab('vitals')}>Vital Signs</button>
            <button className={`tab ${activeTab === 'lifestyle' ? 'active' : ''}`} onClick={() => setActiveTab('lifestyle')}>Lifestyle</button>
            <button className={`tab ${activeTab === 'medical' ? 'active' : ''}`} onClick={() => setActiveTab('medical')}>Medical History</button>
          </div>
          <div className="tab-content">
            {activeTab === 'basic' && (
              <div className="tab-pane">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input id="age" name="age" type="number" value={formData.age} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="height">Height (cm)</label>
                    <input id="height" name="height" type="number" value={formData.height} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="weight">Weight (kg)</label>
                    <input id="weight" name="weight" type="number" value={formData.weight} onChange={handleChange} required />
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'vitals' && (
              <div className="tab-pane">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="bloodPressure" className="icon-label">
                      <Heart className="icon" />
                      <span>Blood Pressure</span>
                    </label>
                    <div className="input-group">
                      <input
                        id="bloodPressureSystolic"
                        name="bloodPressureSystolic"
                        type="number"
                        placeholder="Systolic"
                        value={formData.bloodPressureSystolic}
                        onChange={handleChange}
                        required
                      />
                      <input
                        id="bloodPressureDiastolic"
                        name="bloodPressureDiastolic"
                        type="number"
                        placeholder="Diastolic"
                        value={formData.bloodPressureDiastolic}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="heartRate" className="icon-label">
                      <Activity className="icon" />
                      <span>Heart Rate (bpm)</span>
                    </label>
                    <input id="heartRate" name="heartRate" type="number" value={formData.heartRate} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="temperature" className="icon-label">
                      <Thermometer className="icon" />
                      <span>Body Temperature (°C)</span>
                    </label>
                    <input id="temperature" name="temperature" type="number" step="0.1" value={formData.temperature} onChange={handleChange} required />
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'lifestyle' && (
              <div className="tab-pane">
                <div className="form-group">
                  <label className="icon-label">
                    <Cigarette className="icon" />
                    <span>Smoking Status</span>
                  </label>
                  <div className="radio-group">
                    <label>
                      <input type="radio" name="smokingStatus" value="never" checked={formData.smokingStatus === 'never'} onChange={handleChange} />
                      Never
                    </label>
                    <label>
                      <input type="radio" name="smokingStatus" value="former" checked={formData.smokingStatus === 'former'} onChange={handleChange} />
                      Former
                    </label>
                    <label>
                      <input type="radio" name="smokingStatus" value="current" checked={formData.smokingStatus === 'current'} onChange={handleChange} />
                      Current
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label className="icon-label">
                    <Beer className="icon" />
                    <span>Alcohol Consumption</span>
                  </label>
                  <select name="alcoholConsumption" value={formData.alcoholConsumption} onChange={handleChange}>
                    <option value="">Select frequency</option>
                    <option value="never">Never</option>
                    <option value="occasionally">Occasionally</option>
                    <option value="weekly">Weekly</option>
                    <option value="daily">Daily</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="icon-label">
                    <Activity className="icon" />
                    <span>Exercise Frequency (days per week)</span>
                  </label>
                  <input
                    type="range"
                    name="exerciseFrequency"
                    min="0"
                    max="7"
                    step="1"
                    value={formData.exerciseFrequency}
                    onChange={(e) => handleSliderChange('exerciseFrequency', e.target.value)}
                  />
                  <div className="slider-value">{formData.exerciseFrequency} days</div>
                </div>
                <div className="form-group">
                  <label className="icon-label">
                    <Moon className="icon" />
                    <span>Sleep Hours (per night)</span>
                  </label>
                  <input
                    type="range"
                    name="sleepHours"
                    min="0"
                    max="12"
                    step="0.5"
                    value={formData.sleepHours}
                    onChange={(e) => handleSliderChange('sleepHours', e.target.value)}
                  />
                  <div className="slider-value">{formData.sleepHours} hours</div>
                </div>
                <div className="form-group">
                  <label className="icon-label">
                    <Sun className="icon" />
                    <span>Stress Level</span>
                  </label>
                  <input
                    type="range"
                    name="stressLevel"
                    min="0"
                    max="10"
                    step="1"
                    value={formData.stressLevel}
                    onChange={(e) => handleSliderChange('stressLevel', e.target.value)}
                  />
                  <div className="slider-value">Level: {formData.stressLevel}</div>
                </div>
                <div className="form-group">
                  <label className="icon-label">
                    <Apple className="icon" />
                    <span>Diet Type</span>
                  </label>
                  <select name="dietType" value={formData.dietType} onChange={handleChange}>
                    <option value="">Select diet type</option>
                    <option value="omnivore">Omnivore</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="keto">Keto</option>
                    <option value="paleo">Paleo</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="icon-label">
                    <Droplets className="icon" />
                    <span>Water Intake (liters per day)</span>
                  </label>
                  <input id="waterIntake" name="waterIntake" type="number" step="0.1" value={formData.waterIntake} onChange={handleChange} required />
                </div>
              </div>
            )}
            {activeTab === 'medical' && (
              <div className="tab-pane">
                <div className="form-group">
                  <label>Chronic Conditions (Check all that apply)</label>
                  <div className="checkbox-grid">
                    {['Diabetes', 'Hypertension', 'Asthma', 'Heart Disease', 'Arthritis', 'Cancer', 'Thyroid Disorder', 'Depression'].map((condition) => (
                      <label key={condition} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.chronicConditions.includes(condition)}
                          onChange={(e) => handleCheckboxChange(condition, e.target.checked)}
                        />
                        <span>{condition}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="allergies">Allergies</label>
                  <textarea id="allergies" name="allergies" value={formData.allergies} onChange={handleChange} placeholder="List any allergies..." />
                </div>
                <div className="form-group">
                  <label htmlFor="currentMedications">Current Medications</label>
                  <textarea id="currentMedications" name="currentMedications" value={formData.currentMedications} onChange={handleChange} placeholder="List current medications..." />
                </div>
                <div className="form-group">
                  <label htmlFor="familyHistory">Family Medical History</label>
                  <textarea id="familyHistory" name="familyHistory" value={formData.familyHistory} onChange={handleChange} placeholder="Describe any significant family medical history..." />
                </div>
                <div className="form-group">
                  <label htmlFor="currentSymptoms">Current Symptoms</label>
                  <textarea id="currentSymptoms" name="currentSymptoms" value={formData.currentSymptoms} onChange={handleChange} placeholder="Describe any current symptoms..." />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="card-footer">
          <div className="progress-container">
            <label>Form Completion</label>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
          <button type="submit" className="submit-button" onClick={handle}>
            Submit Health Assessment
          </button>
        </div>
      </div>
    </form>

  )
}

export default HealthAssessmentForm