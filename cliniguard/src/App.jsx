import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PatientDeshboard from './components/PatientDeshboard';
import ComprehensiveAppointmentPage from './components/Appoitment';


const App = () => {
  return (
   <>
   <Router>

   <Routes>
   <Route path='/' element={<Home/>}></Route>
   <Route path='/Login' element={<Login/>}></Route>
   <Route path='/ComprehensiveAppointmentPage' element={<ComprehensiveAppointmentPage/>}></Route>
   </Routes>
   <PatientDeshboard/>
   
   </Router>
   </>
  )
}

export default App

