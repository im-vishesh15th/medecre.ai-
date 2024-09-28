import React, { useContext } from 'react'
import { HealthContext } from '../context/HealthContext'



export default function PatientHealthReport() {
    const {loginDetails} = useContext(HealthContext)
  const [activeTab, setActiveTab] = React.useState('reports')

  const patient = {
    name: loginDetails.userName||"unkown",
    id: "P12345",
    dob: "1985-03-15",
  }

  const healthReports = [
    { id: 1, date: "2023-05-15", type: "Blood Test", result: "Normal" },
    { id: 2, date: "2023-04-20", type: "X-Ray", result: "No abnormalities detected" },
    { id: 3, date: "2023-03-10", type: "Annual Check-up", result: "Good overall health" },
  ]

  const prescriptions = [
    { id: 1, date: "2023-05-15", medication: "Amoxicillin", dosage: "500mg", frequency: "3 times daily", duration: "7 days", instructions: "Take with food. Complete the full course." },
    { id: 2, date: "2023-04-01", medication: "Lisinopril", dosage: "10mg", frequency: "Once daily", duration: "30 days", instructions: "Take in the morning. Avoid grapefruit." },
    { id: 3, date: "2023-03-20", medication: "Metformin", dosage: "850mg", frequency: "Twice daily", duration: "90 days", instructions: "Take with meals to reduce stomach upset." },
  ]

  const testReports = [
    { id: 1, date: "2023-05-15", test: "Complete Blood Count", result: "Within normal range" },
    { id: 2, date: "2023-04-20", test: "Lipid Panel", result: "Slightly elevated LDL cholesterol" },
    { id: 3, date: "2023-03-10", test: "Thyroid Function", result: "Normal thyroid function" },
  ]

  const renderReports = () => (
    <div className="grid gap-4">
      {healthReports.map((report) => (
        <div key={report.id} className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white">{report.type}</h3>
          <p className="text-gray-400">{report.date}</p>
          <p className="mt-2 text-white"><strong>Result:</strong> {report.result}</p>
        </div>
      ))}
    </div>
  )

  const renderPrescriptions = () => (
    <div className="grid gap-4">
      {prescriptions.map((prescription) => (
        <div key={prescription.id} className="bg-gray-800 p-4 rounded-lg font-mono">
          <h3 className="text-lg font-semibold text-white text-center mb-2">Prescription</h3>
          <div className="space-y-2 text-white">
            <p><strong>Patient:</strong> {patient.name}</p>
            <p><strong>Date:</strong> {prescription.date}</p>
            <p><strong>Medication:</strong> {prescription.medication}</p>
            <p><strong>Dosage:</strong> {prescription.dosage}</p>
            <p><strong>Frequency:</strong> {prescription.frequency}</p>
            <p><strong>Duration:</strong> {prescription.duration}</p>
            <p><strong>Special Instructions:</strong> {prescription.instructions}</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-600">
            <p><strong>Doctor's Signature: </strong> ___________________</p>
            <p><strong>License No: </strong> MD12345</p>
          </div>
        </div>
      ))}
    </div>
  )

  const renderTestReports = () => (
    <div className="grid gap-4">
      {testReports.map((test) => (
        <div key={test.id} className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white">{test.test}</h3>
          <p className="text-gray-400">{test.date}</p>
          <p className="mt-2 text-white"><strong>Result:</strong> {test.result}</p>
        </div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 space-y-8">
      <h1 className="text-3xl font-bold">Patient Health Report</h1>
      
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Patient Information</h2>
        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>Patient ID:</strong> {patient.id}</p>
        <p><strong>Date of Birth:</strong> {patient.dob}</p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <button 
            className={`px-4 py-2 rounded ${activeTab === 'reports' ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => setActiveTab('reports')}
          >
            Health Reports
          </button>
          <button 
            className={`px-4 py-2 rounded ${activeTab === 'prescriptions' ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => setActiveTab('prescriptions')}
          >
            Prescriptions
          </button>
          <button 
            className={`px-4 py-2 rounded ${activeTab === 'tests' ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => setActiveTab('tests')}
          >
            Test Reports
          </button>
        </div>

        {activeTab === 'reports' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Past Health Reports</h2>
            {renderReports()}
          </div>
        )}

        {activeTab === 'prescriptions' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Prescriptions</h2>
            {renderPrescriptions()}
          </div>
        )}

        {activeTab === 'tests' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Past Test Reports</h2>
            {renderTestReports()}
          </div>
        )}
      </div>
    </div>
  )
}