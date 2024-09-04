import React, { useEffect } from 'react'
import Component from '../components/HealthForm'
import Navbar from '../components/Navbar'
import { createMasterTimeline } from '../components/Timeline'
import AppointmentPage from '../components/Appoitment'
import DoctorDashboard from '../components/DectorDeshboard'
import SuperAdminDashboard from '../components/SuperAdmin'




const HealthCheck = () => {
  useEffect(() => {
    const tl = createMasterTimeline();
    return () => {
      tl.kill();
    };
  }, []);
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