import React from 'react';
import star from "../assets/star.svg";

export default function UpcomingAppointments() {
    const appointments=[
        {
            name:"John Radclif",
            Specialist:"Cardiologist",
            img:"https://static.vecteezy.com/system/resources/thumbnails/028/287/555/small_2x/an-indian-young-female-doctor-isolated-on-green-ai-generated-photo.jpg",
            About:"Heart pain",
            Time:"5pm to 7pm",
            Years:"5 years",
            Degree:"MBBS"
        },
        {
          name:"John Radclif",
          Specialist:"Cardiologist",
          img:"https://static.vecteezy.com/system/resources/thumbnails/028/287/555/small_2x/an-indian-young-female-doctor-isolated-on-green-ai-generated-photo.jpg",
          About:"Heart pain",
          Time:"5pm to 7pm",
          Years:"5 years",
          Degree:"MBBS"
      },
      {
        name:"John Radclif",
        Specialist:"Cardiologist",
        img:"https://static.vecteezy.com/system/resources/thumbnails/028/287/555/small_2x/an-indian-young-female-doctor-isolated-on-green-ai-generated-photo.jpg",
        About:"Heart pain",
        Time:"5pm to 7pm",
        Years:"5 years",
        Degree:"MBBS"
    },
    {
      name:"John Radclif",
      Specialist:"Cardiologist",
      img:"https://static.vecteezy.com/system/resources/thumbnails/028/287/555/small_2x/an-indian-young-female-doctor-isolated-on-green-ai-generated-photo.jpg",
      About:"Heart pain",
      Time:"5pm to 7pm",
      Years:"5 years",
      Degree:"MBBS"
  },
    ]
  return (
    <section className='w-full  h-[40%] overflow-y-scroll'>
      
      <div className='flex flex-col w-full justify-start items-start p-2 flex-wrap gap-3  '>
      {appointments.map((e) => {
                return (
                  <div className='flex flex-row justify-between items-center flex-wrap w-full bg-white  p-3 rounded-xl relative'>
                    <div className='flex flex-row justify-between items-center gap-1  p-3 w-[50%]'>
                      <img src={e.img} alt="" className='w-[5rem] h-[5rem] rounded-2xl'/>
                      <div className=''>
                        <div className='flex flex-row justify-center items-center gap-2 '>
                        <p className='text-[1.2rem] font-semibold'>Name:{e.name}</p>
                        <div className='flex flex-row justify-center items-center gap-1 rounded-3xl border-solid border-[2px] border-orange-200 py-1 px-2'>
                          <img src={star} alt="" />
                          <span>4.5</span>
                        </div>
                        </div>
                        <p className='text-gray-400 font-semibold text-[1rem]'>{e.Specialist}</p>
                        <p className='text-gray-400 font-semibold text-[1rem]'>{e.Degree}</p>
                        <p className='text-gray-400 font-semibold text-[1rem]'>Years of Experience:{e.Years}</p>
                      </div>
                      </div>
                      <div className='w-[50%] flex flex-row justify-center items-center gap-2 '>
                        <p className='absolute top-1 left-2 text-gray-400 font-semibold text-[1rem]'>Today 26th July</p>
                        <p className='bg-[#1C4C58] rounded-3xl text-white p-2 w-[12rem] text-center'>Time:{e.Time}</p>
                        <button className='bg-[#1C4C58] rounded-3xl text-white p-2 hover:bg-[#143740] w-[12rem] text-center'>Join a call</button>
                      </div>

                    </div>

                  
                );
              })}
              </div>
      
    </section>
  )
}
