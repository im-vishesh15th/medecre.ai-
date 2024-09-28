import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, Calendar, User } from 'lucide-react'
import Navbar from './Navbar'

// Mock data for doctors
const doctors = [
  { id: 1, name: 'Dr. John Doe', specialization: 'General Practitioner', avatar: '👨‍⚕️' },
  { id: 2, name: 'Dr. Jane Smith', specialization: 'Cardiologist', avatar: '👩‍⚕️' },
  { id: 3, name: 'Dr. Mike Johnson', specialization: 'Pediatrician', avatar: '👨‍⚕️' },
  { id: 4, name: 'Dr. Sarah Brown', specialization: 'Dermatologist', avatar: '👩‍⚕️' },
]

// Function to select a color and determine if the button should be disabled

const selectColour = () => {
  const colors = ['red', 'yellow', 'green'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  const selectedColor = colors[randomIndex];
  return {
    color: selectedColor,
    disabled: selectedColor === 'red'
  };
}

// Helper function to generate time slots
const generateTimeSlots = () => {
  const slots = []
  for (let hour = 9; hour < 17; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      slots.push(time)
    }
  }
  return slots
}

const timeSlots = generateTimeSlots()

export default function GetAppointment() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false)

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

  const handleDateClick = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    setSelectedDate(newDate)
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const handleDoctorSelect = (doctorId) => {
    setSelectedDoctor(doctorId)
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
  }

  const handleSubmit = () => {
    if (selectedDate && selectedDoctor && selectedTime) {
      setAppointmentConfirmed(true)
    } else {
      alert('Please select a date, doctor, and time before submitting.')
    }
  }

  const handleReset = () => {
    setSelectedDate(null)
    setSelectedDoctor(null)
    setSelectedTime(null)
    setAppointmentConfirmed(false)
  }

  if (appointmentConfirmed) {
    const appointmentDetails = {
      date: selectedDate?.toDateString() || '',
      doctor: doctors.find(d => d.id === selectedDoctor)?.name || '',
      time: selectedTime || '',
    }

    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex items-center justify-center">
        <div className="max-w-lg mx-auto bg-gray-800 rounded-lg shadow-lg p-6 text-center">
          <h1 className="text-3xl font-bold mb-6">Thank You!</h1>
          <p className="text-xl mb-4">Your appointment has been scheduled successfully.</p>
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Appointment Details</h2>
            <div className="space-y-2 mt-4">
              <div className="flex items-center justify-center">
                <Calendar className="mr-2" size={20} />
                <span>{appointmentDetails.date}</span>
              </div>
              <div className="flex items-center justify-center">
                <User className="mr-2" size={20} />
                <span>{appointmentDetails.doctor}</span>
              </div>
              <div className="flex items-center justify-center">
                <Clock className="mr-2" size={20} />
                <span>{appointmentDetails.time}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Schedule Another Appointment
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6">Schedule an Appointment</h1>

          {/* Calendar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Select a Date</h2>
              <div className="flex items-center">
                <button onClick={handlePrevMonth} className="p-1 rounded-full hover:bg-gray-700">
                  <ChevronLeft size={24} />
                </button>
                <span className="mx-4">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                <button onClick={handleNextMonth} className="p-1 rounded-full hover:bg-gray-700">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-medium">{day}</div>
              ))}
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={`empty-${index}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1
                const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                const isSelected = selectedDate?.toDateString() === date.toDateString()
                const isDisabled = date < new Date(new Date().setHours(0, 0, 0, 0))
                return (
                  <button
                    key={day}
                    onClick={() => !isDisabled && handleDateClick(day)}
                    className={`p-2 rounded-full ${
                      isSelected
                        ? 'bg-blue-500 text-white'
                        : isDisabled
                        ? 'text-gray-500 cursor-not-allowed'
                        : 'hover:bg-gray-700'
                    }`}
                    disabled={isDisabled}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Doctor Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Select a Doctor</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {doctors.map(doctor => (
                <button
                  key={doctor.id}
                  onClick={() => handleDoctorSelect(doctor.id)}
                  className={`p-4 rounded-lg ${
                    selectedDoctor === doctor.id ? 'bg-blue-500' : 'bg-gray-700'
                  } hover:bg-blue-600 transition-colors`}
                >
                  <div className="flex items-center">
                    <span className="text-4xl mr-4">{doctor.avatar}</span>
                    <div className="text-left">
                      <div className="font-semibold">{doctor.name}</div>
                      <div className="text-sm text-gray-300">{doctor.specialization}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          {selectedDate && selectedDoctor && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Select a Time</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {timeSlots.map(time => {
                  const { color, disabled } = selectColour();

                  return (
                    <button
                      key={time}
                      onClick={() => !disabled && handleTimeSelect(time)}
                      className={`p-2 rounded-lg ${selectedTime === time ? 'bg-blue-500' : 'bg-gray-700'} ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'} transition-colors`}
                      style={{ color }}
                      disabled={disabled}
                    >
                      {time}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
          {/* Appointment Summary */}
        {selectedDate && selectedDoctor && selectedTime && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Appointment Summary</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <Calendar className="mr-2" size={20} />
                <span>{selectedDate.toDateString()}</span>
              </div>
              <div className="flex items-center">
                <User className="mr-2" size={20} />
                <span>{doctors.find(d => d.id === selectedDoctor)?.name || ''}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2" size={20} />
                <span style={{
                  
                }}>{selectedTime || ''}</span>
              </div>
            </div>
          </div>
        )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Confirm Appointment
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
