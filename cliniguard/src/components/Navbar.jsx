
import React, { useEffect } from 'react';
import './Navbar.css'; 
// import {useGSAP} from '@gsap/react'
// import gsap from 'gsap';
// import { createNavbarTimeline } from './Timeline';


const Navbar = () => {
 
    // useGSAP(()=>{
    //   const tl = createNavbarTimeline();
    //   tl.from(".navbar-item",{
    //     y:-50,
    //     opacity:0,
    //     duration:0.5,
    //     delay:0.2,
    //     stagger:0.3


    //   })
      
    // })




  

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span>MyLogo</span>
      </div>
      <ul className="navbar-menu">
        <li className="navbar-item"><a href="#home">Home</a></li>
        <li className="navbar-item"><a href="#services">Services</a></li>
        <li className="navbar-item"><a href="#about">About</a></li>
        <li className="navbar-item"><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
