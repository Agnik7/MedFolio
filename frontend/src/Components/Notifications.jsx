import React from 'react'
import { Phone } from "lucide-react";
import { CircleX } from "lucide-react";

export default function Notifications({close,setClose,notifications}) {
    const handleClose=()=>
    {
        setClose(false);
    }
  return (
    <div
      className={`z-50  shadow-lg shadow-gray-500 bg-white rounded-xl w-[17rem] h-[27rem] pt-1 mb-5 px-2 absolute top-[50%] right-[2%] ${
        close ? "block" : "hidden"
      } flex flex-col justify-center items-center overflow-x-hidden box `}
    >


        <button className="absolute top-3 right-2 hover:scale-110 transition-all ease-linear duration-100" onClick={handleClose}>
          <CircleX className=" text-[2rem]"/>
        </button>
      <h1 className='w-full  text-left pt-1 text-[2rem] font-medium text-[#133139]  pl-[0.2rem]'>Notifications:</h1>
      <ul className="w-full h-[20rem]  flex flex-col justify-start items-start gap-4 p-4 overflow-y-scroll">
        {notifications.map((e)=>
        {
            return(<li className='flex justify-center items-center text-center box p-2 rounded-[0.5rem] font-medium'>{e.message}</li>)
        })}
        
      </ul>
    </div>
  )
}
