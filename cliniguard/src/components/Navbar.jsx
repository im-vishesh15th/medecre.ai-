import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { HeartPulse } from 'lucide-react';
import './Navbar.css';
import Login from '../pages/Login';
import ComprehensiveAppointmentPage from './Appoitment';


export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`navbar ${isVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
      <a href="#" className="navbar-logo">
        <HeartPulse size={32} color="#4fd1c5" />
        <span className="navbar-logo-text">CliniGuard</span>
      </a>
      <nav className="navbar-nav">
        {["Features", "About", "Testimonials", "Contact"].map((item) => (
          <button key={item} className="navbar-nav-button">
            {item}
          </button>
        ))}
      </nav>
      <div className="navbar-actions">
        <Link to="/Login" ><button className="navbar-action-button login-button">Login</button></Link>
        <Link to='/ComprehensiveAppointmentPage'><button className="navbar-action-button appointment-button">Appointment</button>
        </Link>
        
      </div>
    </header>
  );
}
