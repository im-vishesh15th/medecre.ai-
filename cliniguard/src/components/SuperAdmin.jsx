import React, { useState } from 'react'
import {
  Users,
  Calendar,
  Pill,
  FileText,
  ChevronDown,
  Search,
  Bell,
  User,
  PlusCircle,
  Stethoscope,
} from 'lucide-react'

const sidebarItems = [
  { icon: Users, label: 'Patients' },
  { icon: Calendar, label: 'Appointments' },
  { icon: Pill, label: 'Medicines' },
  { icon: Stethoscope, label: 'Doctors' },
  { icon: FileText, label: 'Reports' },
]

const patients = [
  { id: 1, name: 'John Doe', age: 35, lastVisit: '2023-05-15', nextAppointment: '2023-06-10' },
  { id: 2, name: 'Jane Smith', age: 28, lastVisit: '2023-05-20', nextAppointment: '2023-06-05' },
  { id: 3, name: 'Bob Johnson', age: 42, lastVisit: '2023-05-18', nextAppointment: '2023-06-15' },
]

const appointments = [
  { id: 1, patientName: 'John Doe', date: '2023-06-10', time: '10:00 AM', type: 'Check-up' },
  { id: 2, patientName: 'Jane Smith', date: '2023-06-05', time: '2:30 PM', type: 'Follow-up' },
  { id: 3, patientName: 'Bob Johnson', date: '2023-06-15', time: '11:15 AM', type: 'Consultation' },
]

const medicines = [
  { id: 1, name: 'Amoxicillin', type: 'Antibiotic', stock: 500 },
  { id: 2, name: 'Lisinopril', type: 'ACE Inhibitor', stock: 300 },
  { id: 3, name: 'Metformin', type: 'Antidiabetic', stock: 400 },
]

const doctors = [
  { id: 1, name: 'Dr. Emily Chen', specialization: 'Cardiology', patients: 120, yearsOfExperience: 15 },
  { id: 2, name: 'Dr. Michael Rodriguez', specialization: 'Pediatrics', patients: 150, yearsOfExperience: 10 },
  { id: 3, name: 'Dr. Sarah Johnson', specialization: 'Neurology', patients: 90, yearsOfExperience: 12 },
  { id: 4, name: 'Dr. David Kim', specialization: 'Orthopedics', patients: 110, yearsOfExperience: 8 },
]

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState('Patients')

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <aside className="w-64 bg-gray-800">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-100">MediConnect</h1>
        </div>
        <nav className="mt-8">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={`flex items-center w-full px-4 py-3 text-left ${
                activeTab === item.label ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 text-gray-300'
              }`}
              onClick={() => setActiveTab(item.label)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-gray-800">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-2xl font-semibold">{activeTab}</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-600 bg-gray-900 rounded-full text-gray-300"
                />
              </div>
              <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                <Bell className="h-5 w-5 text-gray-300" />
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-300" />
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-300" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {activeTab === 'Patients' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Patient List</h3>
                <button className="flex items-center px-4 py-2 bg-gray-700 text-gray-100 rounded-md hover:bg-gray-600">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Add Patient
                </button>
              </div>
              <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Age</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Last Visit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Next Appointment</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {patients.map((patient) => (
                      <tr key={patient.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{patient.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{patient.age}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{patient.lastVisit}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{patient.nextAppointment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'Appointments' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Upcoming Appointments</h3>
                <button className="flex items-center px-4 py-2 bg-gray-700 text-gray-100 rounded-md hover:bg-gray-600">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Schedule Appointment
                </button>
              </div>
              <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Patient Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Type</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {appointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{appointment.patientName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{appointment.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{appointment.time}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{appointment.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'Medicines' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Available Medicines</h3>
                <button className="flex items-center px-4 py-2 bg-gray-700 text-gray-100 rounded-md hover:bg-gray-600">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Add Medicine
                </button>
              </div>
              <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Stock</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {medicines.map((medicine) => (
                      <tr key={medicine.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{medicine.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{medicine.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{medicine.stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'Doctors' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Doctors</h3>
                <button className="flex items-center px-4 py-2 bg-gray-700 text-gray-100 rounded-md hover:bg-gray-600">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Add Doctor
                </button>
              </div>
              <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Specialization</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Patients</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Experience</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {doctors.map((doctor) => (
                      <tr key={doctor.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{doctor.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{doctor.specialization}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{doctor.patients}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{doctor.yearsOfExperience} years</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
