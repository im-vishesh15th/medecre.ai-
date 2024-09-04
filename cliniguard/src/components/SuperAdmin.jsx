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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-primary-foreground">
        <div className="p-4">
          <h1 className="text-2xl font-bold">MediConnect</h1>
        </div>
        <nav className="mt-8">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={`flex items-center w-full px-4 py-3 text-left ${
                activeTab === item.label ? 'bg-primary-foreground text-primary' : 'hover:bg-primary-foreground/10'
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
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-2xl font-semibold">{activeTab}</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border rounded-full"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <Bell className="h-5 w-5" />
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    <User className="h-5 w-5" />
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {/* Dropdown menu would go here */}
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
                <button className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Add Patient
                </button>
              </div>
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Appointment</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
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
                <button className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Schedule Appointment
                </button>
              </div>
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
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
                <h3 className="text-xl font-semibold">Medicine Inventory</h3>
                <button className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Add Medicine
                </button>
              </div>
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
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
                <h3 className="text-xl font-semibold">Doctor Details</h3>
                <button className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Add Doctor
                </button>
              </div>
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patients</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
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

          {activeTab === 'Reports' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Reports</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="text-lg font-semibold mb-2">Patient Statistics</h4>
                  <p>Total Patients: 150</p>
                  <p>New Patients (This Month): 12</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="text-lg font-semibold mb-2">Appointment Statistics</h4>
                  <p>Appointments Today: 8</p>
                  <p>Appointments This Week: 35</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="text-lg font-semibold mb-2">Medicine Usage</h4>
                  <p>Most Prescribed: Amoxicillin</p>
                  <p>Low Stock Alert: Lisinopril</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}