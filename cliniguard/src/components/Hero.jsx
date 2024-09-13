import React, { useContext, useState } from 'react';
import { ArrowRight, Image } from "lucide-react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from '../pages/Login';
import PatientDeshboard from './PatientDeshboard';
import { HealthContext } from '../context/HealthContext';
import HealthAssessmentForm from './HealthForm';
import { useNavigate } from 'react-router-dom';




const Hero = () => {
  const { loginDetails } = useContext(HealthContext);
  const navigate = useNavigate();




   const fillform=localStorage.getItem('fillform') 
 
  const handleRedirect = () => {
    if (loginDetails.role=="doctor"){
      navigate('/DoctorDashboard')
  
    }
    else if(loginDetails.role=='superadmin'){
      navigate('/SuperAdminDashboard')

    }
    else{
      if (!loginDetails.isLogged) {
        navigate('/Login');
      } else if (loginDetails.isLogged && fillform!=1) {
        navigate('/HealthAssessmentForm');
      } else if (loginDetails.isLogged && fillform==1) {
        navigate('/PatientDeshboard');
      }
    }
  };
  
  

  return (
    <section className="h-screen flex items-center bg-gray-900 text-gray-100">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent md:text-4xl">
            Revolutionize Your Clinic Operations
          </h1>
          <p className="text-teal-300 mb-8 text-lg">
            CliniGuard: A comprehensive web application to empower healthcare providers, 
            enhance patient care, and streamline your entire clinical workflow.
          </p>
          <button onClick={handleRedirect} className="bg-teal-400 text-gray-900 px-4 py-2 font-bold flex items-center gap-2 rounded hover:bg-teal-300">
            Get Started <ArrowRight size={16} />
          </button>
        </div>
        <div className="flex-1">
          <Image
            src="/path-to-your-image.png"
            alt="CliniGuard Dashboard"
            width={400}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
