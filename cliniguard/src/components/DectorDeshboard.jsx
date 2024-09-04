import React, { useState } from 'react'
import {
  Calendar,
  Users,
  FileText,
  User,
  ChevronDown,
  Search,
  Bell,
} from 'lucide-react'

const sidebarItems = [
  { icon: User, label: 'Profile' },
  { icon: Calendar, label: 'Appointments' },
  { icon: Users, label: 'Patients' },
  { icon: FileText, label: 'Reports' },
]

const profile = {
  name: 'Dr. Emily Chen',
  specialization: 'Cardiologist',
  experience: '15 years',
  patients: 120,
  photoUrl: 'https://via.placeholder.com/150',
  bio: `Dr. Emily Chen is a highly respected cardiologist with over 15 years of experience in diagnosing and treating heart conditions. She is known for her patient-centered approach and dedication to providing the highest quality care.`,
}

const appointments = [
  { id: 1, patientName: 'John Doe', date: '2023-06-10', time: '10:00 AM', type: 'Check-up' },
  { id: 2, patientName: 'Jane Smith', date: '2023-06-05', time: '2:30 PM', type: 'Follow-up' },
  { id: 3, patientName: 'Bob Johnson', date: '2023-06-15', time: '11:15 AM', type: 'Consultation' },
]

const patients = [
  { id: 1, name: 'John Doe', age: 35, lastVisit: '2023-05-15', nextAppointment: '2023-06-10' },
  { id: 2, name: 'Jane Smith', age: 28, lastVisit: '2023-05-20', nextAppointment: '2023-06-05' },
  { id: 3, name: 'Bob Johnson', age: 42, lastVisit: '2023-05-18', nextAppointment: '2023-06-15' },
]

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState('Profile')

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-gray-100">
        <div className="p-4">
          <h1 className="text-2xl font-bold">MediConnect</h1>
        </div>
        <nav className="mt-8">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={`flex items-center w-full px-4 py-3 text-left ${
                activeTab === item.label ? 'bg-gray-800 text-white' : 'hover:bg-gray-800'
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
        <header className="bg-gray-900 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-2xl font-semibold">{activeTab}</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2   border-none rounded-full bg-gray-800 text-white placeholder-gray-400"
                />
              </div>
              <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
                <Bell className="h-5 w-5" />
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
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
          {activeTab === 'Profile' && (
            <div className="flex flex-col items-center justify-center h-full bg-gray-900 text-white">
              <div className="w-full max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
                <div className="flex items-center space-x-8">
                  <img
                    src={profile.photoUrl}
                    alt="Doctor Profile"
                    className="w-48 h-48 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-3xl font-semibold">{profile.name}</h3>
                    <p className="text-xl">{profile.specialization}</p>
                    <p className="mt-2 text-gray-400">{profile.experience}</p>
                    <p className="mt-4">{profile.bio}</p>
                    <p className="mt-4 text-gray-400">Patients Treated: {profile.patients}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Appointments' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Upcoming Appointments</h3>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Patient Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
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

          {activeTab === 'Patients' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Patient List</h3>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Age</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Visit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Next Appointment</th>
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

          {activeTab === 'Reports' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Reports</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h4 className="text-lg font-semibold">Monthly Report</h4>
                  <p className="mt-2 text-gray-400">View and download the monthly report for an overview of patient care.</p>
                  <button className="mt-4 px-4 py-2 bg-gray-700 rounded text-white hover:bg-gray-600">View Report</button>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h4 className="text-lg font-semibold">Annual Report</h4>
                  <p className="mt-2 text-gray-400">Access the annual report to review patient outcomes and performance.</p>
                  <button className="mt-4 px-4 py-2 bg-gray-700 rounded text-white hover:bg-gray-600">View Report</button>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h4 className="text-lg font-semibold">Custom Report</h4>
                  <p className="mt-2 text-gray-400">Generate a custom report based on specific criteria and timeframes.</p>
                  <button className="mt-4 px-4 py-2 bg-gray-700 rounded text-white hover:bg-gray-600">Generate Report</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
