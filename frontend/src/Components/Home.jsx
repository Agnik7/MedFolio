import React from "react";
import main_pic from "../assets/About_right.png";
import { motion } from "framer-motion";
import AuthModal from "./AuthModal";
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

export default function Home({
 user,setUser
}) {
  return (
    <section id="home" className="min-h-[100vh]">
      <div className=" flex justify-between items-center flex-wrap md:flex-nowrap">
        <motion.div
          className="w-full md:w-[60%] p-2 sm:p-10 flex flex-col justify-center items-center sm:items-start gap-5"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-[2rem] md:text-[3rem] lg:text-[4.5rem] font-medium text-center sm:text-left text-[#0E282D]"
            variants={item}
          >
            Navigating Your Health,One Step at a Time...
          </motion.h1>
          <motion.p
            className="bg-[#dce5e7] border-[3px] border-solid border-[#b9c4ca] rounded-[2rem] text-[#1C4C58] px-4 py-2 font-semibold text-[1.2rem]"
            variants={item}
          >
            Manage.Connect.Care
          </motion.p>
          <motion.p
            className=" w-full font-medium xl:w-[80%] text-[1rem] md:text-[1.2rem] lg:text-[1.3rem] text-center sm:text-left text-[#0E282D]"
            variants={item}
          >
            MedFolio bridges patients and doctors with AI, offering health issue
            identification, specialist connections, real-time chat, appointment
            booking, and prescription access. Experience seamless healthcare
            today.
          </motion.p>
          {/* <motion.button className="xsm:mx-2 mx-1 text-center bg-white p-2 rounded-[2rem] flex justify-center items-center border-[3px] border-[solid] border-[#919cba] hover:bg-[#919cba] text-[#1C4C58] font-semibold text-[1.3rem] hover:text-white  transition-all ease-linear duration-150 w-[13rem] "
          variants={item}>
            Start now
          </motion.button> */}
          <AuthModal 
          user={user} 
          setUser={setUser} 
          authClass="text-center bg-white p-2 rounded-[2rem] flex justify-center items-center border-[3px] border-[solid] border-[#919cba] hover:bg-[#919cba] text-[#1C4C58] font-semibold text-[1.3rem] hover:text-white  transition-all ease-linear duration-150 w-[13rem]" 
          itemVariants={item}
          />
        </motion.div>
        <motion.div className="relative w-full  md:w-[40%] flex justify-end items-end"
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:1}}
        >
          <img src={main_pic} alt="" className="  " />
        </motion.div>
      </div>
    </section>
  );
}
