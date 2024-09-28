'use client'

import React, { useContext, useState } from "react";
import { Calendar, Clock, FileText, User, Activity, Bell, Settings, Heart, Droplet, Thermometer, Dumbbell, TrendingUp } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Component from "./Chatbot";
import { HealthContext } from "../context/HealthContext";

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

const healthTrendsData = [
  { date: '2023-01', heartRate: 72, systolic: 120, diastolic: 80, glucose: 95 },
  { date: '2023-02', heartRate: 75, systolic: 118, diastolic: 78, glucose: 100 },
  { date: '2023-03', heartRate: 70, systolic: 122, diastolic: 82, glucose: 92 },
  { date: '2023-04', heartRate: 73, systolic: 121, diastolic: 79, glucose: 98 },
  { date: '2023-05', heartRate: 71, systolic: 119, diastolic: 81, glucose: 97 },
  { date: '2023-06', heartRate: 74, systolic: 123, diastolic: 83, glucose: 101 },
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

const HealthGraphs = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-white">Heart Rate Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={healthTrendsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} />
            <Legend />
            <Line type="monotone" dataKey="heartRate" stroke="#14b8a6" name="Heart Rate (bpm)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-white">Blood Pressure Readings</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={healthTrendsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} />
            <Legend />
            <Bar dataKey="systolic" fill="#14b8a6" name="Systolic" />
            <Bar dataKey="diastolic" fill="#0d9488" name="Diastolic" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-white">Blood Glucose Levels</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={healthTrendsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} />
            <Legend />
            <Area type="monotone" dataKey="glucose" stroke="#14b8a6" fill="#0f766e" name="Glucose (mg/dL)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default function PatientDashboard() {
  const { loginDetails} = useContext(HealthContext);
  const PatientInfo= {
    name: loginDetails.userName,
    age: 35,
    gender: "Male",
    bloodType: "A+",
    lastVisit: "2023-05-15",
    photoUrl: "data:image/png;base64,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",
  }
  const navigate = useNavigate();

  const handleAppointment = () => {
    navigate("/ComprehensiveAppointmentPage");
  };

  const handleReport = () => {
    navigate("/PatientHealthReport");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <Component />
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
              <li key={appointment.id} className="border-b border-gray-700 pb-2 flex justify-between">
                <div>
                  <p className="font-medium">{appointment.date} at {appointment.time}</p>
                  <p>{appointment.doctor} - {appointment.department}</p>
                </div>
                <button onClick={() => navigate(`/call/${appointment.id}`, { state: PatientInfo.name })} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                  Join Now
                </button>
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

      {/* Health Trends Graphs */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <TrendingUp className="mr-2 text-teal-400" />
          Health Trends
        </h2>
        <HealthGraphs />
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button
          className="bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-lg transition duration-300 ease-in-out flex flex-col items-center"
          onClick={handleAppointment}
        >
          <Clock className="mb-2" />
          Schedule Appointment
        </button>
        <button
          onClick={handleReport}
          className="bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-lg transition duration-300 ease-in-out flex flex-col items-center"
        >
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