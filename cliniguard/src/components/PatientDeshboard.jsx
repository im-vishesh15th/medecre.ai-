import React from "react";
import { Calendar, Clock, FileText, User, Activity, Bell, Settings, Heart, Droplet, Thermometer, Dumbbell, TrendingUp } from 'lucide-react';

const PatientInfo = {
  name: "John Doe",
  age: 35,
  gender: "Male",
  bloodType: "A+",
  lastVisit: "2023-05-15",
  photoUrl: "/placeholder.svg?height=200&width=200",
};

const UpcomingAppointments = [
  { id: 1, date: "2023-06-10", time: "10:00 AM", doctor: "Dr. Smith", department: "Cardiology" },
  { id: 2, date: "2023-06-18", time: "2:30 PM", doctor: "Dr. Johnson", department: "Orthopedics" },
  { id: 3, date: "2023-06-25", time: "11:15 AM", doctor: "Dr. Williams", department: "Neurology" },
];

const HealthMetrics = [
  { name: "Heart Rate", value: 72, unit: "bpm", icon: Heart, level: "normal" },
  { name: "Blood Pressure", value: "120/80", unit: "mmHg", icon: Activity, level: "normal" },
  { name: "Blood Glucose", value: 100, unit: "mg/dL", icon: Droplet, level: "normal" },
  { name: "Body Temperature", value: 98.6, unit: "°F", icon: Thermometer, level: "normal" },
  { name: "BMI", value: 24.5, unit: "", icon: Dumbbell, level: "normal" },
  { name: "Cholesterol", value: 180, unit: "mg/dL", icon: Droplet, level: "warning" },
];

const getLevelColor = (level) => {
  switch (level) {
    case "normal": return "text-green-400";
    case "warning": return "text-yellow-400";
    case "critical": return "text-red-400";
    default: return "text-gray-400";
  }
};

const MetricCard = ({ metric }) => (
  <div className="bg-gray-800 p-4 rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center">
        <metric.icon className="mr-2 text-teal-400" size={20} />
        <h3 className="font-semibold">{metric.name}</h3>
      </div>
      <span className={`font-bold ${getLevelColor(metric.level)}`}>
        {metric.value} {metric.unit}
      </span>
    </div>
    <div className={`text-sm ${getLevelColor(metric.level)} capitalize`}>
      {metric.level}
    </div>
  </div>
);

const HealthTrendsChart = () => {
  const data = [
    { month: 'Jan', heartRate: 70, bloodPressure: 120 },
    { month: 'Feb', heartRate: 72, bloodPressure: 118 },
    { month: 'Mar', heartRate: 71, bloodPressure: 122 },
    { month: 'Apr', heartRate: 73, bloodPressure: 121 },
    { month: 'May', heartRate: 72, bloodPressure: 120 },
  ];

  return (
    <div className="w-full h-64 flex items-end justify-between">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="flex space-x-1">
            <div
              className="w-4 bg-teal-400"
              style={{ height: `${item.heartRate}px` }}
            />
            <div
              className="w-4 bg-indigo-400"
              style={{ height: `${item.bloodPressure / 2}px` }}
            />
          </div>
          <span className="mt-2 text-xs">{item.month}</span>
        </div>
      ))}
    </div>
  );
};

export default function PatientDeshboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-teal-400">Patient Dashboard</h1>
        <div className="flex space-x-4">
          <button className="bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-full transition duration-300 ease-in-out">
            <Bell size={20} />
          </button>
          <button className="bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-full transition duration-300 ease-in-out">
            <Settings size={20} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Upcoming Appointments */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="mr-2 text-teal-400" />
            Upcoming Appointments
          </h2>
          <ul className="space-y-4">
            {UpcomingAppointments.map((appointment) => (
              <li key={appointment.id} className="border-b border-gray-700 pb-2">
                <p className="font-medium">{appointment.date} at {appointment.time}</p>
                <p>{appointment.doctor} - {appointment.department}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Patient Information */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <img
            src={PatientInfo.photoUrl}
            alt={PatientInfo.name}
            className="w-32 h-32 rounded-full mb-4 object-cover"
          />
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <User className="mr-2 text-teal-400" />
            Patient Information
          </h2>
          <div className="space-y-2 text-center">
            <p><strong>Name:</strong> {PatientInfo.name}</p>
            <p><strong>Age:</strong> {PatientInfo.age}</p>
            <p><strong>Gender:</strong> {PatientInfo.gender}</p>
            <p><strong>Blood Type:</strong> {PatientInfo.bloodType}</p>
            <p><strong>Last Visit:</strong> {PatientInfo.lastVisit}</p>
          </div>
        </div>

        {/* Health Metrics */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Activity className="mr-2 text-teal-400" />
            Health Metrics
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {HealthMetrics.map((metric, index) => (
              <MetricCard key={index} metric={metric} />
            ))}
          </div>
        </div>
      </div>

      {/* Health Trends Chart */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <TrendingUp className="mr-2 text-teal-400" />
          Health Trends
        </h2>
        <HealthTrendsChart />
        <div className="mt-4 flex justify-center space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-teal-400 mr-2" />
            <span className="text-sm">Heart Rate</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-indigo-400 mr-2" />
            <span className="text-sm">Blood Pressure</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button className="bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-lg transition duration-300 ease-in-out flex flex-col items-center">
          <Clock className="mb-2" />
          Schedule Appointment
        </button>
        <button className="bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-lg transition duration-300 ease-in-out flex flex-col items-center">
          <FileText className="mb-2" />
          View Medical Records
        </button>
        <button className="bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-lg transition duration-300 ease-in-out flex flex-col items-center">
          <Bell className="mb-2" />
          Notifications
        </button>
        <button className="bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-lg transition duration-300 ease-in-out flex flex-col items-center">
          <Settings className="mb-2" />
          Account Settings
        </button>
      </div>
    </div>
  );
}
