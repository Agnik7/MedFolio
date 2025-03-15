import React from "react";
import main_pic from "../assets/About_right.png"

export default function Home() {
  return (
    <section id="home" className="min-h-[100vh]">
      <div className=" flex justify-between items-center flex-wrap md:flex-nowrap">
        <div className="w-full md:w-[60%] p-2 sm:p-10 flex flex-col justify-center items-center sm:items-start gap-5">
          <h1 className="text-[2rem] md:text-[3rem] lg:text-[4rem]  text-center sm:text-left text-[#0E282D]">Navigating Your Health,One Step at a Time...</h1>
          <p className="bg-[#dce5e7] border-[3px] border-solid border-[#b9c4ca] rounded-[2rem] text-[#1C4C58] px-4 py-2 font-semibold text-[1.2rem]">Manage.Connect.Care</p>
          <p className=" w-full font-medium xl:w-[80%] text-[1rem] md:text-[1.2rem] lg:text-[1.3rem] text-center sm:text-left text-[#0E282D]">
            MedFolio bridges patients and doctors with AI, offering health issue
            identification, specialist connections, real-time chat, appointment
            booking, and prescription access. Experience seamless healthcare
            today.
          </p>
          <button className="xsm:mx-2 mx-1 text-center bg-white p-2 rounded-[2rem] flex justify-center items-center border-[3px] border-[solid] border-[#919cba] hover:bg-[#919cba] text-[#1C4C58] font-semibold text-[1.2rem] hover:text-white  transition-all ease-linear duration-150 w-[13rem] ">
            Start now
          </button>
        </div>
        <div className="relative w-full  md:w-[40%] flex justify-end items-end">
          <img src={main_pic} alt="" className="  "/>
        </div>
      </div>
    </section>
  );
}
