
import { CircleX } from "lucide-react";
import React from 'react'
import EditModal from "./EditModal";
import { useNavigate } from "react-router-dom";
export default function DoctorProfile({user,setUser,view,setView}) {
    const navigate=useNavigate();
    const handleClose=()=>
        {
            
            setView(!(view));
        }
        const handleLogout = async () => {
          localStorage.removeItem("userData");
          await setUser({ ...user, isLoggedIn: false });
          navigate("/");
          setView(!(view))
        };
  return (
    
    <div
      className={`z-50 modal shadow-lg shadow-gray-500 bg-white rounded-xl w-[90%] sm:w-[60%] h-[90%] sm:h-[80%] mb-5 absolute top-[50%] left-[50%] ${
        view ? "block" : "hidden"
      } `}
    >
      <div className="flex flex-col justify-center items-center gap-3 mx-3 mb-2  h-[15rem] relative p-2">
        <button className="absolute top-2 right-2 hover:scale-105 transition-all ease-linear duration-100" onClick={handleClose}>
          <CircleX className="text-black text-[2rem]"/>
        </button>
        <img
          src={user.profilePic}
          alt="pic"
          className="w-[6rem] h-[6rem] rounded-full border-solid border-[3px] border-[#1C4C58]"
        />
        <div className="flex flex-col justify-center items-center">
        <p className="text-[2rem] font-semibold mb-2">
                  {user.fullName}
                </p>
                <p className="text-gray-400 font-semibold text-[1.2rem]">
                  {user.specialization}
                </p>
                <p className="text-gray-400 font-semibold text-[1.2rem]">
                  Experience: {user.experience} years
                </p>
          </div>
      </div>
      <div className="w-full h-[0.2rem] bg-gray-400"></div>
      <div className="w-full m-2 flex flex-col justify-center items-start gap-2">
      <p className="text-black font-semibold text-[1rem] xl:text-[1.2rem]">
                Email:{user.email}
              </p>
              <p className="text-black font-semibold text-[1rem] xl:text-[1.2rem]">
                City: {user.city}
              </p>
              <p className="text-black font-semibold text-[1rem] xl:text-[1.2rem]">
                Rating: {user.rating}
              </p>
              <p className="text-black font-semibold text-[1rem] xl:text-[1.2rem]">
                Fees: Rs.{user.fees}
              </p>
              <p className="text-black font-semibold text-[1rem] xl:text-[1.2rem]">
                Total Earning: Rs.{user.fees * user.appointments.length}
              </p>
          </div>
          <div className="absolute bottom-2 right-2 flex justify-center items-center gap-3">
      <EditModal user={user} setUser={setUser} />
              <button
                className="underline text-[1rem] font-bold text-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
      </div>
    </div>
  );
}
