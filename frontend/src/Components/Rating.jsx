import React, { useState } from "react";
import { CircleX } from "lucide-react";
import axios from "axios";
export default function Rating({showrating,setShowrating,actDoc}) {
  const [num,setNum]=useState(0);
  const [val,setVal]=useState(0);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const[col1,setCol1]=useState(false);
  const[col2,setCol2]=useState(false);
  const[col3,setCol3]=useState(false);
  const[col4,setCol4]=useState(false);
  const[col5,setCol5]=useState(false);
  const[hide,setHide]=useState(false);
  const Number=(event)=>
  {
    
    setVal(event.target.innerText);
    
    if(event.target.innerText==1)
    {
      setCol1(true);
    }
    if(event.target.innerText==2)
    {
      setCol2(true);
    }
    if(event.target.innerText==3)
    {
      setCol3(true);
    }
    if(event.target.innerText==4)
    {
      setCol4(true);
    }
    if(event.target.innerText==5)
    {
      setCol5(true);
    }
    
  }
  
  const handleRating=async()=>
  {
    setNum(val);
    setHide(true);
    await axios.post(`${baseUrl}/user/rating`,{
      userRating:val,
      doctorName: actDoc
    })
    .then((res)=>{
      console.log((res))
      setHide(false);
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  const handleClose=()=>
    {
        
        setShowrating(false);
    }
  return (
    <>
    <section className={`${showrating?"block":"hidden"} absolute top-[50%] left-[50%] modal`}>
      <div className={`top ${hide?"hidden":"block"} bg-[#133139]  flex flex-col justify-center items-start p-[1rem] sm:p-[2rem] rounded-[2rem] sm:w-[25rem] w-[18rem] relative h-[22rem]`}>
      <button className="absolute top-5 right-5 hover:scale-105 transition-all ease-linear duration-100" onClick={handleClose}>
          <CircleX className=" text-[2rem] text-white"/>
        </button>
        
        <p className="text-[#f4f8f8] text-[1.7rem] mb-[1rem] font-bold">Rate {actDoc}</p>
        <p className="w-[100%]  text-[#ffffff]  text-[1rem] mb-[1.5rem]">
       All feedback
          is appreciated to help us improve our offering!
        </p>
        <div className="rate flex flex-row justify-between items-center w-[100%] text-[#000000] mb-[2rem]">
          <div className={`flex justity-center items-center ${col1?"text-[#000000]":"text-[#000000]"} ${col1?"bg-[#BAC9D5]":"bg-[#ffffff]"}  rounded-full w-[3rem] h-[3rem] text-[1.35rem] text-center hover:text-[#000000] hover:bg-[#BAC9D5] transition-all duration-300 ease-linear cursor-pointer`} onClick={Number}>
            <span className="w-full text-center">1</span>
          </div>
          <div className={`flex justity-center ${col2?"text-[#000000]":"text-[#000000]"} items-center ${col2?"bg-[#BAC9D5]":"bg-[#ffffff]"} rounded-full w-[3rem] h-[3rem] text-[1.35em] text-center hover:text-[#000000] hover:bg-[#BAC9D5] transition-all duration-300 ease-linear cursor-pointer`} onClick={Number}>
            <span className="w-full text-center">2</span>
          </div>
          <div className={`flex justity-center ${col3?"text-[#000000]":"text-[#000000]"} items-center ${col3?"bg-[#BAC9D5]":"bg-[#ffffff]"} rounded-full w-[3rem] h-[3rem] text-[1.35em] text-center hover:text-[#000000] hover:bg-[#BAC9D5] transition-all duration-300 ease-linear cursor-pointer`} onClick={Number}>
            <span className="w-full text-center">3</span>
          </div>
          <div className={`flex justity-center ${col4?"text-[#000000]":"text-[#000000]"} items-center ${col4?"bg-[#BAC9D5]":"bg-[#ffffff]"} rounded-full w-[3rem] h-[3rem] text-[1.35em] text-center hover:text-[#000000] hover:bg-[#BAC9D5] transition-all duration-300 ease-linear cursor-pointer`} onClick={Number}>
            <span className="w-full text-center">4</span>
          </div>
          <div className={`flex justity-center ${col5?"text-[#000000]":"text-[#000000]"} items-center ${col5?"bg-[#BAC9D5]":"bg-[#ffffff]"} rounded-full w-[3rem] h-[3rem] text-[1.35em] text-center hover:text-[#000000] hover:bg-[#BAC9D5] transition-all duration-300 ease-linear cursor-pointer `} onClick={Number}>
            <span className="w-full text-center">5</span>
          </div>
        </div>
        <button className="bg-white w-[100%] text-[#133139] text-[1.2rem] font-bold tracking-widest rounded-[2rem] h-[2.5rem] hover:bg-[#BAC9D5] transition-all ease-linear duration-200 hover:text-[#000000] text-center flex flex-row justify-center items-center" onClick={handleRating}>
          Submit
        </button>
      </div>
      <div className={`bottom  bg-[#133139]  flex flex-col justify-center items-center p-[1rem] sm:p-[2rem] rounded-[2rem] sm:w-[25rem] w-[18rem] ${hide?"block":"hidden"} relative h-[22rem]`}>
      <button className="absolute top-4 right-4 hover:scale-105 transition-all ease-linear duration-100" onClick={handleClose}>
          <CircleX className=" text-[2rem] text-white"/>
        </button>
        
        <div className="  text-[#133139] bg-[#BAC9D5] text-center px-[1.5rem] py-[0.3rem] rounded-[2rem] text-[1rem] mb-[1.5rem]">
          You selected {num} out of 5
        </div>
        <p className="text-[#ffffff] text-[2rem] mb-[1rem]">Thank you!</p>
        <p className="text-center text-[#ffffff]">
          We appreciate you taking the time to give a rating. If you ever need
          more support, don’t hesitate to get in touch!
        </p>
      </div>
      </section>
    </>
  );
}
