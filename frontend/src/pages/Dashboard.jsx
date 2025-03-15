import React from "react";
import SideNav from "../Components/SideNav";
import UpcomingAppointments from "../Components/UpcomingAppointments";
import MyDoctors from "../Components/MyDoctors";
import Blogs from "../Components/Blogs";

export default function Dashboard({ user, setUser }) {
  return (
    <section className=" h-full w-full px-5 flex flex-row justify-between items-center ">
      <div className="h-full w-[62%]">
        <h1 className="text-[2rem] font-semibold mb-1">
          Upcoming Appointments
        </h1>
        <UpcomingAppointments />
        <h1 className="text-[2rem] font-semibold mb-2">My Doctors</h1>
        <MyDoctors />
      </div>
      <div className="  w-[35%] flex flex-col justify-between items-center   h-full">
        <div className="bg-white rounded-xl w-[20rem] h-[18rem] mb-5">
          <div className="flex justify-start items-center gap-3 m-4 relative h-[5rem]">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/028/287/555/small_2x/an-indian-young-female-doctor-isolated-on-green-ai-generated-photo.jpg"
            alt="pic"
            className="w-[4rem] h-[4rem] rounded-xl"
          />
          <div>
            <p className="text-[1.2rem] font-semibold">Name:Joe Don</p>
            <p className="text-gray-400 font-semibold text-[1rem]">Patient</p>
          </div>
          <div className="absolute bottom-0 right-0 flex justify-center items-center gap-2">
            <button className="underline text-[0.8rem] font-bold">Edit Profile</button>
            <button className="underline text-[0.8rem] font-bold text-red-600">Logout</button>
          </div>
          </div>
          <div className="w-full h-[0.2rem] bg-gray-400"></div>
          <div className="w-full m-4 flex flex-col justify-center items-start gap-2">
          <p className="text-gray-400 font-semibold text-[1rem]">Gender:Male</p>
          <p className="text-gray-400 font-semibold text-[1rem]">Blood Group:B+</p>
          <p className="text-gray-400 font-semibold text-[1rem]">Age:30+</p>
          <p className="text-gray-400 font-semibold text-[1rem]">Email:john@gmail.com</p>
          <p className="text-gray-400 font-semibold text-[1rem]">Phone Number:9123984567</p>
          </div>
          <Blogs/>
          


        </div>
      </div>
    </section>
  );
}
