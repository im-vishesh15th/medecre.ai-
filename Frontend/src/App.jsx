import React, { useContext } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PatientDeshboard from './components/PatientDeshboard';
import ComprehensiveAppointmentPage from './components/Appoitment';
import SymptomsPage from './components/Health';
import { HealthContext, HealthProvider } from './context/HealthContext';
import GetAppointment from './components/Get-appoitment';
import HealthAssessmentForm from './components/HealthForm';
import DoctorDashboard from './components/DectorDeshboard';
import SuperAdminDashboard from './components/SuperAdmin';
import VideoCallJoin from './pages/VideoCallJoin'
import VideoCall from './pages/VideoCall'
import PatientHealthReport from './components/Report';




const App = () => {

  return (
    <HealthProvider>
   <Router>
   <Routes>
   <Route path='/' element={<Home/>}></Route>
   <Route path='/Login' element={<Login/>}></Route>
   <Route path='/ComprehensiveAppointmentPage' element={<ComprehensiveAppointmentPage/>}></Route>
   <Route path='/HealthAssessmentForm' element={<HealthAssessmentForm/>}></Route>
   <Route path='/PatientDeshboard' element={<PatientDeshboard/>}></Route>
   <Route path='/GetAppointment' element={<GetAppointment/>}></Route>
   <Route path='/DoctorDashboard' element={<DoctorDashboard/>}></Route>
   <Route path='/SuperAdminDashboard' element={<SuperAdminDashboard/>}></Route>
   <Route path='/call' element={<VideoCallJoin/>}></Route>
   <Route path='/call/:roomId' element={<VideoCall/>}></Route>
   <Route path='PatientHealthReport' element={<PatientHealthReport/>} ></Route>
   </Routes>
   </Router>
   
 
   </HealthProvider>
  )
}

export default App

