import React from "react";
import email from "../assets/Email.png";
import phn from "../assets/phn.png";
import twitter from "../assets/twitter.png";
import insta from "../assets/insta.png";
import fb from "../assets/fb.png";


export default function Contact() {
  return (
    <section id="contact">
      <div className="px-5 text-[#1C4C58] flex flex-row justify-between items-center flex-wrap md:flex-nowrap gap-10">
        <div className="w-full md:w-[60%]  flex flex-col justify-start items-center md:items-start md:ml-10">
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
          <button className="xsm:mx-2 mx-1 text-center bg-white p-2 rounded-[2rem] flex justify-center items-center border-[3px] border-[solid] border-[#919cba] hover:bg-[#919cba] text-[#1C4C58] font-semibold text-[1.2rem] hover:text-white  transition-all ease-linear duration-150 w-[13rem]">
            Start now
          </button>
          </div>
        </div>
        <div className="w-full md:w-[40%] flex md:flex-col flex-row flex-wrap md:flex-nowrap justify-center items-center md:items-start gap-4 pl-5 mb-3">
          <div className="flex flex-row justify-center items-center md:gap-1 gap-5 ">
          <div>
            <img src={email} alt="" className="md:w-[3.5rem] w-[2rem]" />
          </div>
          <div className="md:flex flex-col justify-center items-start  hidden">
            <h1 className="text-[1.2rem] font-bold">E-mail</h1>
            <p className="font-semibold">medfolio@gmail.com</p>
          </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-1">
          <div>
            <img src={phn} alt=""  className="md:w-[3.5rem] w-[2rem]"/>
          </div>
          <div className="md:flex flex-col justify-center items-start  hidden">
            <h1 className="text-[1.2rem] font-bold">Phone No.</h1>
            <p className="font-semibold">+033 1236987442</p>
          </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-1">
          <div>
            <img src={twitter} alt=""  className="md:w-[3.5rem] w-[2rem]"/>
          </div>
          <div className="md:flex flex-col justify-center items-start  hidden">
            <h1 className="text-[1.2rem] font-bold">Twitter</h1>
            <p className="font-semibold">medfolio.x</p>
          </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-1">
          <div>
            <img src={insta} alt=""  className="md:w-[3.5rem] w-[2rem]"/>
          </div>
          <div className="md:flex flex-col justify-center items-start  hidden">
            <h1 className="text-[1.2rem] font-bold">Instagram</h1>
            <p className="font-semibold">medfolio.com</p>
          </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-1">
          <div>
            <img src={fb} alt=""  className="md:w-[3.5rem] w-[2rem]"/>
          </div>
          <div className="md:flex flex-col justify-center items-start  hidden">
            <h1 className="text-[1.2rem] font-bold">Facebook</h1>
            <p className="font-semibold">medfolio.facebook</p>
          </div>
          </div>

        </div>
      </div>
    </section>
  );
}
