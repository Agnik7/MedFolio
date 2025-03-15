import React, { useEffect, useState } from 'react';
import HomeNav from '../Components/HomeNav';
import Home from '../Components/Home';
import AboutUs from '../Components/AboutUs';
import Contact from '../Components/Contact';
import { Slant as Hamburger } from "hamburger-react";
import Footer from '../Components/Footer';
import AuthModal from '../Components/AuthModal';

export default function LandingPage(
  {
    user,
    setUser
  }
) {
  const [open,setOpen]=useState(false);
  
  return (
    <section className='min-h-[100vh] relative  bg-[#BAC9D5] overflow-hidden '>
        <HomeNav open={open} setOpen={setOpen} user={user} 
            setUser={setUser}/>
        <div className={`hamburger_block z-10 min-h-screen 2xsm:hidden ${open?"translate-x-[0rem]":"translate-x-[50rem]"} backdrop-blur-md bg-[#BAC9D5]  w-full fixed flex flex-col justify-center items-center transition-all ease-linear duration-300  top-0`}>
          <ul className="flex flex-col justify-center items-center gap-4  mb-[0.5rem] sm:text-[1.2rem] xsm:text-[1rem] text-[1.5rem] text-[#1C4C58]">
            <li className="xsm:mx-2 mx-1 text-center font-semibold hover:text-[#437e8c] transition-all ease-linear duration-150 hover:cursor-pointer">
              <a href="#home">Home</a>
            </li>

            <li className="xsm:mx-2 mx-1 text-center font-semibold hover:text-[#437e8c] transition-all ease-linear duration-150 hover:cursor-pointer">
              <a href="#about">About Us</a>
            </li>

            <li className="xsm:mx-2 mx-1 text-center font-semibold hover:text-[#437e8c] transition-all ease-linear duration-150 hover:cursor-pointer">
              <a href="#contact">Contact Us</a>
            </li>

            {/* <button className=" xsm:mx-2 mx-1 text-center bg-white p-2 rounded-[2rem] flex justify-center items-center border-[2px] border-[solid] border-[#1C4C58] hover:bg-[#1C4C58] hover:text-white   hover:border-[#ffffff] transition-all ease-linear duration-150 ">
              Start now
            </button> */}
            <AuthModal 
            user={user} 
            setUser={setUser}  />
          </ul>
        </div>
        <Home
          user={user} 
          setUser={setUser} 
        />
        <AboutUs/>
        <Contact/>
        <Footer/>
        
      
    </section>
  )
}
