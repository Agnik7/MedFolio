import React from "react";
import email from "../assets/Email.png";
import phn from "../assets/phn.png";
import twitter from "../assets/twitter.png";
import insta from "../assets/insta.png";
import fb from "../assets/fb.png";
import { motion } from "framer-motion";

export default function Contact() {
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

  return (
    <section id="contact">
      <div className="px-5 text-[#1C4C58] flex flex-row justify-between items-center flex-wrap md:flex-nowrap gap-10">
        <motion.div className="w-full md:w-[60%]  flex flex-col justify-start items-center md:items-start md:ml-10"
        initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{duration:1}}>
          <h1 className="text-[3rem] font-semibold">Contact</h1>
          <p className="text-[1.1rem] md:text-[left] text-center">
            Feel free to contact us any time. We will get back to you as soon as
            we can!
          </p>
          <div className="flex flex-col justify-center items-center w-[80%]">
            <form action="" className="w-full gap-4 mt-10">
              <input
                type="text"
                placeholder="Name"
                className="outline-none border-b-2 border-b-solid border-b-[#1C4C58] w-full bg-transparent mb-10 md:text-[1.5rem] text-[1.2rem] placeholder:text-[#1C4C58]"
              />
              <input
                type="text"
                placeholder="E-mail"
                className="outline-none border-b-2 border-b-solid border-b-[#1C4C58] w-full bg-transparent mb-10 md:text-[1.5rem] text-[1.2rem] placeholder:text-[#1C4C58]"
              />
              <input
                type="text"
                placeholder="Message"
                className="outline-none border-b-2 border-b-solid border-b-[#1C4C58] w-full bg-transparent mb-10
              md:text-[1.5rem] text-[1.2rem] placeholder:text-[#1C4C58]"
              />
            </form>
            <button className="xsm:mx-2 mx-1 text-center bg-white p-2 rounded-[2rem] flex justify-center items-center border-[3px] border-[solid] border-[#919cba] hover:bg-[#919cba] text-[#1C4C58] font-semibold text-[1.3rem] hover:text-white  transition-all ease-linear duration-150 w-[13rem]">
              Send
            </button>
          </div>
        </motion.div>
        <motion.div
          className="w-full md:w-[40%] flex md:flex-col flex-row flex-wrap md:flex-nowrap justify-center items-center md:items-start gap-4 pl-5 mb-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
        >
          <motion.div className="flex flex-row justify-center items-center md:gap-2 gap-5 " variants={item}>
            <div>
              <img src={email} alt="" className="md:w-[3.5rem] w-[2rem]" />
            </div>
            <div className="md:flex flex-col justify-center items-start  hidden">
              <h1 className="text-[1.2rem] font-bold">E-mail</h1>
              <p className="font-semibold">medfolio@gmail.com</p>
            </div>
          </motion.div>
          <motion.div className="flex flex-row justify-center items-center gap-1" variants={item}>
            <div>
              <img src={phn} alt="" className="md:w-[3.5rem] w-[2rem]" />
            </div>
            <div className="md:flex flex-col justify-center items-start  hidden">
              <h1 className="text-[1.2rem] font-bold">Phone No.</h1>
              <p className="font-semibold">+033 1236987442</p>
            </div>
          </motion.div>
          <motion.div className="flex flex-row justify-center items-center gap-1" variants={item}>
            <div>
              <img src={twitter} alt="" className="md:w-[3.5rem] w-[2rem]" />
            </div>
            <div className="md:flex flex-col justify-center items-start  hidden">
              <h1 className="text-[1.2rem] font-bold">Twitter</h1>
              <p className="font-semibold">medfolio.x</p>
            </div>
          </motion.div>
          <motion.div className="flex flex-row justify-center items-center gap-1" variants={item}>
            <div>
              <img src={insta} alt="" className="md:w-[3.5rem] w-[2rem]" />
            </div>
            <div className="md:flex flex-col justify-center items-start  hidden">
              <h1 className="text-[1.2rem] font-bold">Instagram</h1>
              <p className="font-semibold">medfolio.com</p>
            </div>
          </motion.div>
          <motion.div className="flex flex-row justify-center items-center gap-1" variants={item}>
            <div>
              <img src={fb} alt="" className="md:w-[3.5rem] w-[2rem]" />
            </div>
            <div className="md:flex flex-col justify-center items-start  hidden">
              <h1 className="text-[1.2rem] font-bold">Facebook</h1>
              <p className="font-semibold">medfolio.facebook</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
