import React, { useState } from "react";
import PrescriptionModal from "./PrescriptionModal";
import star from "../assets/star.svg";
import { EllipsisVertical } from "lucide-react";

export default function MyDoctors({ user, setUser, showrating,
  setShowrating,actDoc,setActDoc }) {
  const [activeDoctor, setActiveDoctor] = useState(null);

  const toggleMenu = (doctorName) => {
    setActiveDoctor(activeDoctor === doctorName ? null : doctorName);
    setActDoc(activeDoctor === doctorName ? null : doctorName);
  };
  const Show=()=>
  {
    setShowrating(true);
  }

  return (
    <section className={`w-full py-4 h-[40%]  ${user.appointments.length === 0?"":"overflow-y-scroll"}`}>
      <div className="flex flex-row w-full justify-start items-start p-2 flex-wrap gap-7">
        {user.appointments.length === 0 ? (
          <div className="w-full text-[2rem] text-center text-gray-500 font-semibold">
            No Doctors Found
          </div>
        ) :(
          user.appointments.map((e) => (
            <div
              key={e.doctorName}
              className="py-3 px-1 flex flex-row md:flex-col justify-center gap-8 md:gap-3 items-center flex-wrap w-full md:w-[46%] bg-white p-3 rounded-xl relative"
            >
              <button
                className="absolute top-5 right-1 hover:cursor-pointer"
                onClick={() => toggleMenu(e.doctorName)}
              >
                <EllipsisVertical />
              </button>
              {activeDoctor === e.doctorName && (
                <button className="absolute top-10 md:top-10 right-1 text-[#143740] font-medium bg-[#BAC9D5] shadow-2xl shadow-black p-3 rounded-[1rem] hover:bg-[#9bacba] transition-all duration-150 ease-linear hover:cursor-pointer" onClick={Show}>
                  Rate Doctor
                </button>
              )}
              <div className="flex flex-row flex-wrap justify-center items-center gap-1 rounded-3xl border-solid border-[2px] border-orange-200 py-1 px-2 bg-white absolute top-[-1rem] right-[-1rem]">
                <img src={star} alt="" />
                <span>{e.doctorRating}</span>
              </div>
              <div className="flex flex-row justify-between items-center gap-5">
                <img
                  src={e.doctorPic}
                  alt=""
                  className="w-[4rem] h-[4rem] rounded-2xl"
                />
                <div>
                  <div className="flex flex-row justify-start items-center gap-2">
                    <p className="text-[1rem] font-semibold">
                      Name: {e.doctorName}
                    </p>
                  </div>
                  <p className="text-gray-400 font-semibold text-[0.8rem]">
                    {e.doctorSpecialization}
                  </p>
                  <p className="text-gray-400 font-semibold text-[0.8rem]">
                    Experience: {e.doctorExperience} yrs
                  </p>
                  <p className="text-gray-400 font-semibold text-[0.8rem]">
                    Checkup Fees: <b>₹</b>
                    {e.doctorFees}
                  </p>
                </div>
              </div>
              <div className="flex flex-row flex-wrap md:flex-col justify-center items-center gap-2">
                <p className="absolute top-1 left-2 text-gray-400 font-semibold text-[0.8rem] mb-1">
                Appointment: {e.date}
                </p>
                <button className="bg-[#1C4C58] rounded-3xl text-white p-2 hover:bg-[#143740] w-full">
                  Book an appointment
                </button>
                <PrescriptionModal doctor={e} user={user} />
              </div>
            </div>
          ))
        )}
        
      </div>
    </section>
  );
}
