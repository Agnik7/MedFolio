import React from "react";
import star from "../assets/star.svg";
import PrescriptionModal from "./PrescriptionModal";

export default function MyPatients({ user }) {

  return (
    <section className={`w-full py-4 h-[40%]  ${user.appointments.length === 0?"":"overflow-y-scroll"}`}>
      <div className="flex flex-row w-full justify-start items-start p-2 flex-wrap gap-7">
        {user.appointments.length === 0 ?(
          <div className="w-full text-[2rem] text-center text-gray-500 font-semibold">
          <span>No Patients</span>
        </div>
        ):(        
        user.appointments.map((e) => (
          <div
            key={e.userName}
            className="py-3 px-1 flex flex-row md:flex-col justify-center gap-8 md:gap-3 items-center flex-wrap w-full md:w-[45%] bg-white p-3 rounded-xl relative"
          >
            <div className="flex flex-row justify-between items-center gap-5">
              <img
                src={e.userPic}
                alt=""
                className="w-[4rem] h-[4rem] rounded-full"
              />
              <div>
                <div className="flex flex-row justify-start items-center gap-2">
                  <p className="text-[1rem] font-semibold">Name: {e.userName}</p>
                </div>
                <p className="text-gray-400 capitalize font-semibold text-[0.8rem]">
                    patient
                  </p>
                  <p className="text-gray-400 font-semibold text-[0.8rem]">
                    About: {e.disease}
                  </p>
                <p className="text-gray-400 font-semibold text-[0.8rem]">
                  Checkup Fees: <b>₹</b>{user.fees}
                </p>
              </div>
            </div>
            <div className="flex flex-row  w-full px-4 flex-wrap md:flex-col justify-center items-center gap-2">
              <p className="absolute top-1 left-2 text-gray-400 font-semibold text-[0.8rem] mb-1">
                Today {e.date}
              </p>
              <PrescriptionModal doctor={e}  user={user} />
            </div>
          </div>
        )))}
      </div>
    </section>
  );
}
