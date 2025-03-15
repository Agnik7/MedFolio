import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import { Slant as Hamburger } from "hamburger-react";
import AuthModal from './AuthModal';
export default function HomeNav(props) {
  
  const handleOpen=()=>
  {
    props.setOpen(!(props.open));
  }
  return (
    <section className=" w-full flex justify-center items-center">
      <div className="w-full   mx-1 sm:mx-2 flex justify-between 2xsm:justify-center items-center pt-2">
        <div>
          <img src={Logo} alt="logo" className="sm:w-full w-[80%]" />
        </div>
        <button className="z-50 block 2xsm:hidden fixed right-0" onClick={handleOpen}>
          <Hamburger color="#1C4C58" />
        </button>
        <div className="hidden w-[90%]  border-b-[3px] border-b-solid border-b-[#1C4C58] 2xsm:flex justify-end items-end">
          <ul className="flex justify-between items-center  mb-[0.5rem] sm:text-[1.2rem] xsm:text-[1rem] text-[0.8rem] text-[#1C4C58]">
            <li className="xsm:mx-2 mx-1 text-center font-semibold hover:text-[#437e8c] transition-all ease-linear duration-150 hover:cursor-pointer">
              <a href="#home">Home</a>
            </li>

            <li className="xsm:mx-2 mx-1 text-center font-semibold hover:text-[#437e8c] transition-all ease-linear duration-150 hover:cursor-pointer">
              <a href="#about">About Us</a>
            </li>

            <li className="xsm:mx-2 mx-1 text-center font-semibold hover:text-[#437e8c] transition-all ease-linear duration-150 hover:cursor-pointer">
              <a href="#contact">Contact Us</a>
            </li>           
            <AuthModal/>
          </ul>
        </div>
        
      </div>
      
    </section>
  );
}
