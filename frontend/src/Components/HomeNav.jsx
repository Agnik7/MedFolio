import React from "react";
import Logo from "../assets/Logo.png";
import { Slant as Hamburger } from 'hamburger-react'

export default function HomeNav() {
  return (
    <section className=" w-full flex justify-center items-center">
      <div className="w-[90%]   mx-1 sm:mx-4 flex justify-between 2xsm:justify-center items-center pt-2">
        <div>
          <img src={Logo} alt="logo" className="sm:w-full w-[80%]" />
        </div>
        <div>
          <Hamburger/>
        </div>
        <div className="hidden w-[80%]  border-b-[3px] border-b-solid border-b-[#1C4C58] 2xsm:flex justify-end items-end">
          <ul className="flex justify-between items-center  mb-[0.5rem] sm:text-[1.2rem] xsm:text-[1rem] text-[0.8rem] text-[#1C4C58]">
           
              <li className="xsm:mx-2 mx-1 text-center font-semibold hover:text-[#437e8c] transition-all ease-linear duration-150 hover:cursor-pointer">
              <a href="#home">Home</a>
              </li>
            
           
              <li className="xsm:mx-2 mx-1 text-center font-semibold hover:text-[#437e8c] transition-all ease-linear duration-150 hover:cursor-pointer">
              <a href="#about">
                About Us
                </a>
              </li>
            
            
              <li className="xsm:mx-2 mx-1 text-center font-semibold hover:text-[#437e8c] transition-all ease-linear duration-150 hover:cursor-pointer">
              <a href="#contact">
                Contact Us
                </a>
              </li>
           

            <button className="xsm:mx-2 mx-1 text-center bg-white p-2 rounded-[2rem] flex justify-center items-center border-[2px] border-[solid] border-[#1C4C58] hover:bg-[#1C4C58] hover:text-white   hover:border-[#ffffff] transition-all ease-linear duration-150">
              Start now
            </button>
          </ul>
        </div>
      </div>
    </section>
  );
}
