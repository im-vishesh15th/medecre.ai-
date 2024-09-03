import React, { useEffect } from 'react'
import Component from '../components/HealthForm'
import Navbar from '../components/Navbar'
import { createMasterTimeline } from '../components/Timeline'
import AppointmentPage from '../components/Appoitment'



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
    
    </>
  )
}

export default HealthCheck