

import React, { useContext, useState } from 'react'
import { Calendar, Users, FileText, User, ChevronDown, Search, Bell, Video, LogOut } from 'lucide-react'
import  {useNavigate} from 'react-router-dom'
import { HealthContext } from '../context/HealthContext'
const sidebarItems = [
  { icon: User, label: 'Profile' },
  { icon: Calendar, label: 'Appointments' },
  { icon: Users, label: 'Patients' },
  { icon: FileText, label: 'Reports' },
]

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
  const{loginDetails,logout} =useContext(HealthContext)
  const profile = {
    name: `Dr.${loginDetails.userName}`,
    specialization: 'Cardiologist',
    experience: '15 years',
    patients: 120,
    photoUrl: 'data:image/jpeg;base64,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',
    bio: `Dr.${loginDetails.userName}  is a highly respected cardiologist with over 15 years of experience in diagnosing and treating heart conditions. She is known for her patient-centered approach and dedication to providing the highest quality care.
  
  Dr. Chen completed her medical degree at Harvard Medical School and her residency in internal medicine at Massachusetts General Hospital. She then pursued a fellowship in cardiology at the Cleveland Clinic, where she honed her skills in advanced cardiac imaging and interventional procedures.
  
  Throughout her career, Dr. Chen has been at the forefront of cardiac care, introducing innovative treatments and participating in groundbreaking research studies. She has a particular interest in preventive cardiology and has helped many patients improve their heart health through lifestyle modifications and personalized treatment plans.
  
  In addition to her clinical work, Dr. Chen is an active member of the American College of Cardiology and has published numerous articles in peer-reviewed journals. She is also passionate about medical education and regularly mentors medical students and residents.
  
  Dr. Chen's approach to patient care is holistic, considering not just the physical aspects of heart health but also the emotional and lifestyle factors that contribute to overall well-being. Her patients appreciate her warm bedside manner, clear communication, and commitment to providing the best possible care.
  
  When not in the clinic, Dr. Chen enjoys hiking, practicing yoga, and spending time with her family. She believes in practicing what she preaches and maintains an active, heart-healthy lifestyle.`,
  }
  const navigate= useNavigate();
  const [activeTab, setActiveTab] = useState('Profile')
  const [isAvailable, setIsAvailable] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleAvailability = () => {
    setIsAvailable(!isAvailable)
  }

  const handleLogout = () => {
    console.log('Logging out...')
    logout()
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
          <h1 className="text-2xl font-bold">CliniGuard</h1>
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
                            <Button onClick={()=>navigate(`/call/${appointment.id}`,{state:profile.name})}>
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