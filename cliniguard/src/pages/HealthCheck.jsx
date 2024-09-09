import React, { useEffect } from 'react'
import Component from '../components/HealthForm'
import Navbar from '../components/Navbar'
import AppointmentPage from '../components/Appoitment'
import DoctorDashboard from '../components/DectorDeshboard'
import SuperAdminDashboard from '../components/SuperAdmin'




const HealthCheck = () => {
  return (
    <>
    <Navbar/>
    <Component/>
    <AppointmentPage/>
    <DoctorDashboard/>
    <SuperAdminDashboard/>
    </>
  )
}

export default HealthCheck