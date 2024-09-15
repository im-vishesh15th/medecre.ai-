import React, { useContext } from 'react';
import { ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { HealthContext } from '../context/HealthContext';
import videoBackground from '../assets/141412-777708076_tiny.mp4'; // Correct relative path to your video

const Hero = () => {
  const { loginDetails } = useContext(HealthContext);
  const navigate = useNavigate();
  const fillform = localStorage.getItem('fillform');

  const handleRedirect = () => {
    if (loginDetails.role === "doctor") {
      navigate('/DoctorDashboard');
    } else if (loginDetails.role === 'superadmin') {
      navigate('/SuperAdminDashboard');
    } else {
      if (!loginDetails.isLogged) {
        navigate('/Login');
      } else if (loginDetails.isLogged && fillform != 1) {
        navigate('/HealthAssessmentForm');
      } else if (loginDetails.isLogged && fillform == 1) {
        navigate('/PatientDeshboard');
      }
    }
  };

  return (
    <section className="relative h-screen flex items-center bg-gray-900 text-gray-100">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={videoBackground}
        type="video/mp4"
        autoPlay
        loop
        muted
      />

      {/* Overlay to make text more visible */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent md:text-4xl transition-transform transform hover:scale-105 hover:underline">
            Revolutionize Your Clinic Operations
          </h1>
          <p className="text-white mb-8 text-lg transition-opacity opacity-90 hover:opacity-100">
            CliniGuard: A comprehensive web application to empower healthcare providers,
            enhance patient care, and streamline your entire clinical workflow.
          </p>
          <button
            onClick={handleRedirect}
            className="bg-teal-400 text-gray-900 px-4 py-2 font-bold flex items-center gap-2 rounded hover:bg-teal-300 transition-transform transform hover:scale-105"
          >
            Get Started <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
