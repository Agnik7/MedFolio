import React from "react";
import box1 from "../assets/Group1.png";
import box2 from "../assets/Group2.png";
import box3 from "../assets/Group3.png";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutUs() {
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
    <section id="about">
      <div className="flex flex-row justify-between items-start gap-5 flex-wrap-reverse md:flex-nowrap">
        <motion.div
          className="flex flex-row justify-center items-center  w-full md:w-[60%] p-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
        >
          <div className="flex flex-col justify-center items-center">
            <motion.img src={box3} alt="box1" variants={item} />
            <motion.img src={box2} alt="box2" variants={item} />
          </div>
          <div>
            <motion.img src={box1} alt="box3" variants={item} />
          </div>
        </motion.div>
        <motion.div className="w-full md:w-[45%] flex flex-col justify-center items-center md:items-start gap-5 text-[#0E282D]"
        initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{duration:1.5}}>
          <h1 className="text-[3rem] font-semibold">About Us</h1>
          <p className="w-[80%] font-medium md:text-left text-center">
            Welcome to MedFolio, your comprehensive healthcare companion. We
            bridge the gap between patients and doctors using cutting-edge AI
            technology. Identify health issues, connect with specialists, and
            enjoy real-time chat, appointment booking, and access to
            prescriptions. For healthcare professionals, manage patient
            interactions and track earnings efficiently. Join us to transform
            healthcare accessibility and experience the future of medical
            consultation today.
          </p>
          <button className="btn xsm:mx-2 mx-1 text-center bg-transparent p-2 rounded-[2rem] flex justify-center items-center gap-2 border-[3px] border-[solid] border-[#0E282D] hover:bg-[#0E282D] text-[#0E282D] font-semibold text-[1.2rem] hover:text-white  transition-all ease-linear duration-150 w-[13rem] ">
            <p>Know more</p>
            <MoveRight className="hidden arrow" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
