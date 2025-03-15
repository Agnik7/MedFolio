import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import { Slant as Hamburger } from "hamburger-react";
import AuthModal from "./AuthModal";
import { motion } from "framer-motion";
export default function HomeNav(props) {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const handleOpen = () => {
    props.setOpen(!props.open);
  };
  return (
    <section className="w-full flex justify-center items-center">
      <div className="w-full   mx-1 sm:mx-2 flex justify-between 2xsm:justify-center items-center pt-2">
        <div>
          <img src={Logo} alt="logo" className="sm:w-full w-[80%]" />
        </div>
        <button
          className="z-50 block 2xsm:hidden fixed right-1 bg-[#1C4C58] rounded-full p-1"
          onClick={handleOpen}
        >
          <Hamburger color="#BAC9D5" />
        </button>
        <div className="hidden w-[90%]  border-b-[3px] border-b-solid border-b-[#1C4C58] 2xsm:flex justify-end items-end">
          <motion.ul
            className="flex justify-between items-center  mb-[0.5rem] sm:text-[1.2rem] xsm:text-[1rem] text-[0.8rem] text-[#1C4C58]"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.li
              className="xsm:mx-4 mx-1  text-center font-semibold hover:text-[#437e8c]  transition-all ease-linear duration-150 hover:cursor-pointer"
              variants={item}
            >
              <a href="#home">Home</a>
            </motion.li>

            <motion.li
              className="xsm:mx-4 mx-1 text-center font-semibold hover:text-[#437e8c] transition-all ease-linear duration-150 hover:cursor-pointer"
              variants={item}
            >
              <a href="#about">About Us</a>
            </motion.li>

            <motion.li
              className="xsm:mx-4 mx-1 text-center font-semibold hover:text-[#437e8c] transition-all ease-linear duration-150 hover:cursor-pointer"
              variants={item}
            >
              <a href="#contact">Contact Us</a>
            </motion.li>
            <AuthModal user={props.user} 
            setUser={props.setUser} />
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
