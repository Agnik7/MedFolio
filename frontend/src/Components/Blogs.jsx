import React from 'react'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function Blogs() {
   
  return (
    <div className=' w-full hidden bg-blue-500'>
        <h1 className='text-[1.1rem] font-bold'>Daily Blogs</h1>
         <Carousel infiniteLoop={true} autoPlay={true} showThumbs={false} showStatus={false}>
                <div className='w-[full] bg-[#1C4C58] h-[calc(100vh - 6.5rem -19rem)] rounded-3xl p-2 text-white'>
                    <h1 className='text-[1.5rem] font-semibold text-left'>What Do Olympians Eat for Breakfast?</h1>
                    <div className='flex flex-row justify-start items-center gap-2 my-1'>
                        <p className='text-[1rem]  font-semibold'>By TALYA MINSBERG</p>
                        <p className='text-[#1C4C58] bg-white p-1 rounded-3xl font-bold'> Posted 1day ago</p>
                        
                    </div>
                    <p className='text-left text-[0.8rem]'>Six Paris-bound athletes share how pancakes, Pop-Tarts and mid-game Skittles power their training.The road to the Olympics is paved with carbs.An estimated 15,000 athletes are prepared to compete in Paris this summer. Most will arrive with detailed plans for
                         what to eat before, during and after their events.</p>
                </div>
                <div className='w-[full] bg-[#1C4C58] h-[calc(100vh - 6.5rem -19rem)] rounded-3xl p-2 text-white'>
                    <h1 className='text-[1.5rem] font-semibold text-left'>What Do Olympians Eat for Breakfast?</h1>
                    <div className='flex flex-row justify-start items-center gap-2 my-1'>
                        <p className='text-[1rem]  font-semibold'>By TALYA MINSBERG</p>
                        <p className='text-[#1C4C58] bg-white p-1 rounded-3xl font-bold'> Posted 1day ago</p>
                        
                    </div>
                    <p className='text-left text-[0.8rem]'>Six Paris-bound athletes share how pancakes, Pop-Tarts and mid-game Skittles power their training.The road to the Olympics is paved with carbs.An estimated 15,000 athletes are prepared to compete in Paris this summer. Most will arrive with detailed plans for
                         what to eat before, during and after their events.</p>
                </div>
                <div className='w-[full] bg-[#1C4C58] h-[calc(100vh - 6.5rem -19rem)] rounded-3xl p-2 text-white'>
                    <h1 className='text-[1.5rem] font-semibold text-left'>What Do Olympians Eat for Breakfast?</h1>
                    <div className='flex flex-row justify-start items-center gap-2 my-1'>
                        <p className='text-[1rem]  font-semibold'>By TALYA MINSBERG</p>
                        <p className='text-[#1C4C58] bg-white p-1 rounded-3xl font-bold'> Posted 1day ago</p>
                        
                    </div>
                    <p className='text-left text-[0.8rem]'>Six Paris-bound athletes share how pancakes, Pop-Tarts and mid-game Skittles power their training.The road to the Olympics is paved with carbs.An estimated 15,000 athletes are prepared to compete in Paris this summer. Most will arrive with detailed plans for
                         what to eat before, during and after their events.</p>
                </div>
            </Carousel>
      
    </div>
  )
}
