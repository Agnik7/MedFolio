import React from 'react'
import logo from "../assets/Logo.png";
import { Link, NavLink } from 'react-router-dom';
import medicine from "../assets/medicine.svg"
import aid from "../assets/aid.svg"
import bot from "../assets/Bot.svg"
import doctor from "../assets/Doctor.svg"
import box from "../assets/box.svg"

export default function SideNav(props) {
  return (
    <section className={`${props.count==1?"hidden":"block"} bg-[#1C4C58] h-full  w-[15%] rounded-tr-[2rem]`}>
        <div className='h-full flex flex-col justify-center items-center w-full rounded-tr-[2rem]'> 
            
            
            <nav className='h-full flex flex-col justify-center items-center w-full rounded-tr-[2rem] relative'>
                <ul className='py-4  flex flex-col justify-between items-center gap-4  h-full  w-full rounded-tr-[2rem] text-white'>
                    
                   <a href="/:name/dashboard" className='w-[60%] hover:bg-[#133139] flex flex-col justify-center items-center p-2 rounded-3xl border-[4px] border-solid border-gray-500'>
                   <img src={box} alt="" />
                   <p className='text-center'>Dashboard</p>
                   </a>
                   <a href="/disease" className='w-[60%] hover:bg-[#133139] flex flex-col justify-center items-center  p-3 rounded-3xl border-[4px] border-solid border-gray-500'>
                   <img src={bot} alt="" />
                   <p className='text-center'>Disease Checker</p>
                   </a>
                   <a href="/test" className='w-[60%]  hover:bg-[#133139] flex flex-col justify-center items-center  p-3 rounded-3xl border-[4px] border-solid border-gray-500'>
                   <img src={aid} alt="" />
                   <p className='text-center'>Medical Tests</p>
                   </a>
                   <a href="/doctors" className='w-[60%]  hover:bg-[#133139] flex flex-col justify-center items-center  p-2 rounded-3xl border-[4px] border-solid border-gray-500'>
                   <img src={doctor} alt="" />
                   <p>Doctors</p>
                   </a>
                   <a href="/medicine" className='w-[60%] hover:bg-[#133139] flex flex-col justify-center items-center  p-3 rounded-3xl border-[4px] border-solid border-gray-500'>
                   <img src={medicine} alt="" className=''/>
                   <p>Medicines</p>
                   </a>
                    
                    
                </ul>
            </nav>


        </div>

    </section>
  )
}
