import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PatientDeshboard from './components/PatientDeshboard';
import ComprehensiveAppointmentPage from './components/Appoitment';
import SymptomsPage from './components/Health';
import { HealthProvider } from './context/HealthContext';
import GetAppointment from './components/Get-appoitment';
import HealthAssessmentForm from './components/HealthForm';


const App = () => {
  return (
    <HealthProvider>
   <Router>
   <Routes>
   <Route path='/' element={<Home/>}></Route>
   <Route path='/Login' element={<Login/>}></Route>
   <Route path='/ComprehensiveAppointmentPage' element={<ComprehensiveAppointmentPage/>}></Route>
   <Route path='/HealthAssessmentForm' element={<HealthAssessmentForm/>}></Route>

   </Routes>
   <GetAppointment/>
   </Router>
   </HealthProvider>
  )
}

export default App

