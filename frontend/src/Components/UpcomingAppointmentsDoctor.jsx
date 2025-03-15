import React from "react";
import star from "../assets/star.svg";

export default function UpcomingAppointmentsDoctor({user}) {
  
  return (
    <section className={`w-full  h-[35%] ${user.appointments.length === 0?"":"overflow-y-scroll"}`}>
      <div className="flex flex-col w-full justify-start items-start p-2 flex-wrap gap-3  ">
        {user.appointments.length === 0?(
          <div className="w-full text-[2rem] text-center text-gray-500 font-semibold">
            <span>No Upcoming Appointments</span>
          </div>
        ):(
          user.appointments.map((e) => {
            return (
              <div className="flex sm:flex-row flex-col  justify-between items-center flex-wrap w-full bg-white  p-3 rounded-xl relative">
                <div className=" flex flex-row justify-center sm:justify-between items-center gap-2  ml-5 sm:w-[40%] w-full">
                  <img
                    src={e.userPic}
                    alt=""
                    className="w-[4rem] h-[4rem] rounded-full"
                  />
                  <div className="">
                    <div className="flex flex-row justify-start items-center md:gap-2 gap-0 w-full ">
                      <p className="sm:text-[1.1rem] font-semibold w-[50%] sm:w-full">
                        Name:{e.userName}
                      </p>
                      
                    </div>
                    <p className="text-gray-400 capitalize font-semibold text-[0.8rem]">
                      patient
                    </p>
                    <p className="text-gray-400 font-semibold text-[0.8rem]">
                      About: {e.disease}
                    </p>
                  </div>
                </div>
                <div className="w-[70%] sm:w-[30%] flex flex-row  flex-wrap justify-center items-end gap-2 ">
                <p className='absolute top-1 left-2 text-gray-400 font-semibold text-[0.8rem]'>Today {e.date}</p>
                <p className='bg-[#1C4C58] rounded-3xl text-white p-2 w-full text-center'>Time: {e.time}</p>
                  
                  
                  <a href={`/appointment/${e.linkID}`}  className="bg-[#1C4C58] rounded-3xl text-white p-2 hover:bg-[#143740] w-full text-center">
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
