'use client'

import React, { useState } from 'react'
import { Calendar, Users, FileText, User, ChevronDown, Search, Bell, Video, LogOut } from 'lucide-react'

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
  photoUrl: '/placeholder.svg?height=300&width=300',
  bio: `Dr. Emily Chen is a highly respected cardiologist with over 15 years of experience in diagnosing and treating heart conditions. She is known for her patient-centered approach and dedication to providing the highest quality care.

Dr. Chen completed her medical degree at Harvard Medical School and her residency in internal medicine at Massachusetts General Hospital. She then pursued a fellowship in cardiology at the Cleveland Clinic, where she honed her skills in advanced cardiac imaging and interventional procedures.

Throughout her career, Dr. Chen has been at the forefront of cardiac care, introducing innovative treatments and participating in groundbreaking research studies. She has a particular interest in preventive cardiology and has helped many patients improve their heart health through lifestyle modifications and personalized treatment plans.

In addition to her clinical work, Dr. Chen is an active member of the American College of Cardiology and has published numerous articles in peer-reviewed journals. She is also passionate about medical education and regularly mentors medical students and residents.

Dr. Chen's approach to patient care is holistic, considering not just the physical aspects of heart health but also the emotional and lifestyle factors that contribute to overall well-being. Her patients appreciate her warm bedside manner, clear communication, and commitment to providing the best possible care.

When not in the clinic, Dr. Chen enjoys hiking, practicing yoga, and spending time with her family. She believes in practicing what she preaches and maintains an active, heart-healthy lifestyle.`,
}

const videoAppointments = [
  { id: 1, patientName: 'John Doe', date: '2023-06-10', time: '10:00 AM', type: 'Video Consultation' },
  { id: 2, patientName: 'Jane Smith', date: '2023-06-05', time: '2:30 PM', type: 'Video Consultation' },
]

const offlineAppointments = [
  { id: 3, patientName: 'Bob Johnson', date: '2023-06-15', time: '11:15 AM', type: 'Offline Consultation' },
  { id: 4, patientName: 'Alice Brown', date: '2023-06-20', time: '3:00 PM', type: 'Offline Consultation' },
]

const patients = [
  { id: 1, name: 'John Doe', age: 35, lastVisit: '2023-05-15', nextAppointment: '2023-06-10' },
  { id: 2, name: 'Jane Smith', age: 28, lastVisit: '2023-05-20', nextAppointment: '2023-06-05' },
  { id: 3, name: 'Bob Johnson', age: 42, lastVisit: '2023-05-18', nextAppointment: '2023-06-15' },
]

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState('Profile')
  const [isAvailable, setIsAvailable] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleAvailability = () => {
    setIsAvailable(!isAvailable)
  }

  const handleLogout = () => {
    console.log('Logging out...')
  }

  const Button = ({ children, onClick, className = '' }) => (
    <button
      className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )

  const Switch = ({ checked, onChange }) => (
    <div
      className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer ${
        checked ? 'bg-green-400' : 'bg-gray-400'
      }`}
      onClick={onChange}
    >
      <div
        className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
          checked ? 'translate-x-7' : ''
        }`}
      />
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-gray-100">
        <div className="p-4">
          <h1 className="text-2xl font-bold">MediConnect</h1>
        </div>
        <nav className="mt-8">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={`flex items-center w-full px-4 py-3 text-left ${
                activeTab === item.label ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'
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
        <header className="bg-gray-800 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-2xl font-semibold">{activeTab}</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span>Availability:</span>
                <Switch
                  checked={isAvailable}
                  onChange={toggleAvailability}
                />
                <span>{isAvailable ? 'On' : 'Off'}</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border-none rounded-full bg-gray-700 text-white placeholder-gray-400"
                />
              </div>
              <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                <Bell className="h-5 w-5" />
              </button>
              <div className="relative">
                <button
                  className="flex items-center space-x-2"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <button
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-600 w-full text-left"
                        onClick={handleLogout}
                      >
                        <LogOut className="inline-block mr-2 h-4 w-4" />
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {activeTab === 'Profile' && (
            <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <img
                  src={profile.photoUrl}
                  alt="Doctor Profile"
                  className="w-48 h-48 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-3xl font-semibold">{profile.name}</h3>
                  <p className="text-xl mt-2">{profile.specialization}</p>
                  <p className="mt-2 text-gray-400">{profile.experience} of experience</p>
                  <p className="mt-4 text-gray-400">Patients Treated: {profile.patients}</p>
                  <div className="mt-6 space-y-4">
                    <h4 className="text-xl font-semibold">Biography</h4>
                    <p className="text-gray-300 whitespace-pre-line">{profile.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Appointments' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Video Consultations</h3>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Patient Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {videoAppointments.map((appointment) => (
                        <tr key={appointment.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{appointment.patientName}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{appointment.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{appointment.time}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Button onClick={() => console.log(`Starting call with ${appointment.patientName}`)}>
                              Start Call
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Offline Consultations</h3>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Patient Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {offlineAppointments.map((appointment) => (
                        <tr key={appointment.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{appointment.patientName}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{appointment.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{appointment.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
                  <Button className="mt-4">View Report</Button>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h4 className="text-lg font-semibold">Annual Report</h4>
                  <p className="mt-2 text-gray-400">Access the annual report to review patient outcomes and performance.</p>
                  <Button className="mt-4">View Report</Button>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h4 className="text-lg font-semibold">Custom Report</h4>
                  <p className="mt-2 text-gray-400">Generate a custom report based on specific criteria and timeframes.</p>
                  <Button className="mt-4">Generate Report</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}