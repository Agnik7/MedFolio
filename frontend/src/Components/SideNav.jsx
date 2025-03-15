import React from "react";
import logo from "../assets/Logo.png";
import { Link, NavLink } from "react-router-dom";
import medicine from "../assets/medicine.svg";
import aid from "../assets/aid.svg";
import bot from "../assets/Bot.svg";
import doctor from "../assets/Doctor.svg";
import box from "../assets/box.svg";

export default function SideNav({ user, setUser }) {
  return (
    <section
      className={`bg-[#1C4C58] h-full sm:block hidden w-[12%] rounded-tr-[2rem] `}
    >
      <div className="h-full flex flex-col justify-center items-center w-full rounded-tr-[2rem]">
        <nav className="h-full flex flex-col justify-center items-center w-full rounded-tr-[2rem] relative">
          <ul className=" py-4  flex flex-col justify-between items-center gap-4  h-full  w-full rounded-tr-[2rem] text-white">
            <Link
              to={`/${user.userName}/dashboard`}
              className="w-[80%] hover:bg-[#133139] flex flex-col justify-center items-center p-2 rounded-3xl border-[4px] border-solid border-gray-500"
            >
              <img src={box} alt="" className="w-[1rem]" />
              <p className="text-center text-[0.6rem] md:text-[1rem]">
                Dashboard
              </p>
            </Link>
            <Link
              to={`/${user.userName}/disease`}
              className="w-[80%] hover:bg-[#133139] flex flex-col justify-center items-center  p-3 rounded-3xl border-[4px] border-solid border-gray-500"
            >
              <img src={bot} alt="" className="w-[1rem]" />
              <p className="text-center text-[1rem]">Disease Checker</p>
            </Link>
            <Link
              to={`/${user.userName}/tests`}
              className="w-[80%]  hover:bg-[#133139] flex flex-col justify-center items-center  p-3 rounded-3xl border-[4px] border-solid border-gray-500"
            >
              <img src={aid} alt="" className="w-[1rem]" />
              <p className="text-center text-[1rem]">Tests</p>
            </Link>
            <Link
              to={`/${user.userName}/doctors`}
              className="w-[80%]  hover:bg-[#133139] flex flex-col justify-center items-center  p-3 rounded-3xl border-[4px] border-solid border-gray-500"
            >
              <img src={doctor} alt="" className="w-[1rem]" />
              <p className="text-center text-[1rem]">Doctors</p>
            </Link>
            <Link
              to={`/${user.userName}/medicine`}
              className="w-[80%] hover:bg-[#133139] flex flex-col justify-center items-center  p-4 rounded-3xl border-[4px] border-solid border-gray-500"
            >
              <img src={medicine} alt="" className="w-[1rem]" />
              <p className="text-center text-[0.7rem] md:text-[1rem]">
                Medicines
              </p>
            </Link>
          </ul>
        </nav>
      </div>
    </section>
  );
}
