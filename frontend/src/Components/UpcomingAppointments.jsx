import React, { useState } from "react";
import star from "../assets/star.svg";
import { EllipsisVertical } from "lucide-react";

export default function UpcomingAppointments({ user, setUser, showrating,
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
    <section className={`w-full  h-[35%] ${user.appointments.length === 0?"":"overflow-y-scroll"}`}>
      <div className="flex flex-col w-full justify-start items-start p-2 flex-wrap gap-3">
        {user.appointments.length === 0 ? (
          <div className="w-full text-[2rem] text-center text-gray-500 font-semibold">
            <span>No Upcoming Appointments</span>
          </div>
        ) : (
          user.appointments.map((e) => {
            return (
              <div
                key={e.linkID}
                className="flex sm:flex-row flex-col justify-between items-center flex-wrap w-full bg-white p-3 rounded-xl relative"
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

                <div className="flex flex-row justify-center sm:justify-between items-center gap-2 ml-5 sm:w-[40%] w-full">
                  <img
                    src={e.doctorPic}
                    alt=""
                    className="w-[4rem] h-[4rem] rounded-2xl"
                  />
                  <div>
                    <div className="flex flex-row justify-start items-center md:gap-2 gap-0 w-full">
                      <p className="sm:text-[1.1rem] font-semibold w-[50%] sm:w-full">
                        Name: {e.doctorName}
                      </p>
                      <div className="flex flex-row justify-center items-center gap-1 rounded-3xl border-solid border-[2px] border-orange-200 py-1 px-2 w-[4rem]">
                        <img src={star} alt="" />
                        <span>{e.doctorRating}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 font-semibold text-[0.8rem]">
                      {e.Specialist}
                    </p>
                    <p className="text-gray-400 font-semibold text-[0.8rem]">
                      {e.Degree}
                    </p>
                    <p className="text-gray-400 font-semibold text-[0.8rem]">
                      Experience: {e.doctorExperience} years
                    </p>
                  </div>
                </div>
                <div className="w-[70%] sm:w-[30%] flex flex-row flex-wrap justify-center items-end gap-2 mr-4">
                  <p className="absolute top-1 left-2 text-gray-400 font-semibold text-[0.8rem]">
                    Appointment: {e.date}
                  </p>
                  <p className="bg-[#1C4C58] rounded-3xl text-white p-2 w-full text-center">
                    Time: {e.time}
                  </p>
                  <a
                    href={`/appointment/${e.linkID}`}
                    className="bg-[#1C4C58] rounded-3xl text-white p-2 hover:bg-[#143740] w-full text-center"
                  >
                    Join a call
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
