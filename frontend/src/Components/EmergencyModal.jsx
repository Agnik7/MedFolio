import React from "react";
import { Phone } from "lucide-react";
import { CircleX } from "lucide-react";
export default function EmergencyModal({emergency,setEmergency}) {
    const handleClose=()=>
        {
            
            setEmergency(false);
        }
  return (
    <div
      className={`z-50  shadow-lg shadow-gray-500 bg-white rounded-xl w-[16rem] h-[21rem] mb-5 absolute top-[50%] sm:right-[17%] md:right-[12%] 2xsm:right-[17%] right-[7%] ${
        emergency ? "block" : "hidden"
      } box1`}
    >


        <button className="absolute top-2 right-2 hover:scale-105 transition-all ease-linear duration-100" onClick={handleClose}>
          <CircleX className=" text-[2rem]"/>
        </button>
      <div className="w-fit h-full flex flex-col justify-center items-start gap-4 p-4 mt-1">
        <span  className="flex flex-col justify-start items-start box1 w-full p-1 rounded-[0.5rem]  font-medium">
        <p className="text-left pl-1">National Emergency Number</p>
        <div className="flex flex-row justify-start items-start pl-1">
          <a href="tel:112" className="mr-3">
            {" "}
            <Phone className="text-red-600 hover:scale-105 transition-all ease-linear duration-100" />
          </a>
          <p>112</p>
          </div>
          
        </span>
        <span  className="flex flex-col justify-start items-start box1 w-full p-1 rounded-[0.5rem] font-medium">
        <p className=" text-left pl-1">Govt. ambulance service.</p>
        <div className="flex flex-row justify-start items-start pl-1">
          <a href="tel:102" className="mr-3">
            {" "}
            <Phone className="text-red-600 hover:scale-105 transition-all ease-linear duration-100"/>
          </a>
          <p>102</p>
          </div>
          
        </span>
        <span  className="flex flex-col justify-start items-start box1 w-full p-1 rounded-[0.5rem] font-medium">
        <p className=" text-left pl-1"> National Blood Bank </p>
        <div className="flex flex-row justify-start items-start pl-1">
          <a href="tel:104" className="mr-3">
            {" "}
            <Phone className="text-red-600 hover:scale-105 transition-all ease-linear duration-100"/>
          </a>
          <p>104</p>
          </div>
          
        </span>
        <span  className="flex flex-col justify-start items-start box1 w-full p-1 rounded-[0.5rem] font-medium">
        <p className=" text-left pl-1">Emergency ambulance service</p>
        <div className="flex flex-row justify-start items-start pl-1">
          <a href="tel:108" className="mr-3">
            {" "}
            <Phone className="text-red-600 hover:scale-105 transition-all ease-linear duration-100"/>
          </a>
          <p>108</p>
          </div>
          
        </span>
        
      </div>
    </div>
  );
}
