import React from 'react';
import HomeNav from '../Components/HomeNav';
import Home from '../Components/Home';
import AboutUs from '../Components/AboutUs';
import Contact from '../Components/Contact';


export default function LandingPage() {
  return (
    <section className='min-h-[100vh]  bg-[#BAC9D5]'>
        <HomeNav/>
        <Home/>
        <AboutUs/>
        <Contact/>
        
      
    </section>
  )
}
