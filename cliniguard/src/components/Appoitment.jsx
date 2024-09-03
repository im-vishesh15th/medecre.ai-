'use client';

import React, { useState } from 'react';

const AppointmentPage = () => {
  const [symptoms, setSymptoms] = useState([{ symptom: '', description: '' }]);
  const [diseasePrediction, setDiseasePrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const addSymptom = () => {
    setSymptoms([...symptoms, { symptom: '', description: '' }]);
  };

  const handleSymptomChange = (index, event) => {
    const newSymptoms = [...symptoms];
    newSymptoms[index][event.target.name] = event.target.value;
    setSymptoms(newSymptoms);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Create the payload for the API request
    const payload = symptoms.map(({ symptom, description }) => ({ symptom, description }));

    try {
      // Replace this URL with your actual API endpoint
      const response = await fetch('https://api.example.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: payload }),
      });
      const data = await response.json();

      if (data.prediction) {
        setDiseasePrediction(data.prediction);
      } else {
        setDiseasePrediction(null);
      }
    } catch (error) {
      console.error('Error fetching prediction:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Appointment Page</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        {symptoms.map((_, index) => (
          <div key={index} style={styles.symptomGroup}>
            <input
              type="text"
              name="symptom"
              placeholder="Symptom"
              value={symptoms[index].symptom}
              onChange={(e) => handleSymptomChange(index, e)}
              style={styles.input}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={symptoms[index].description}
              onChange={(e) => handleSymptomChange(index, e)}
              style={styles.textarea}
            />
          </div>
        ))}
        <button type="button" onClick={addSymptom} style={styles.addButton}>
          Add Another Symptom
        </button>
        <button type="submit" style={styles.submitButton} disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      {diseasePrediction !== null && (
        <div style={styles.result}>
          {diseasePrediction ? (
            <div>
              <h2 style={styles.resultHeader}>Disease Prediction</h2>
              <p>{diseasePrediction}</p>
              <h3>Dietary Recommendations:</h3>
              <p>Example dietary recommendations based on the prediction.</p>
              <h3>Medication Recommendations:</h3>
              <p>Example medication recommendations based on the prediction.</p>
            </div>
          ) : (
            <div>
              <h2 style={styles.resultHeader}>No Prediction</h2>
              <p>No disease was predicted. Please book an appointment for further evaluation.</p>
              <button style={styles.appointmentButton}>Get Appointment</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  symptomGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    height: '80px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  addButton: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  submitButton: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  result: {
    marginTop: '20px',
  },
  resultHeader: {
    marginBottom: '10px',
    color: '#333',
  },
  appointmentButton: {
    padding: '10px',
    backgroundColor: '#ffc107',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default AppointmentPage;
