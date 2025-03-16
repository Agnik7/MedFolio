import React, { useEffect } from "react";
import SideNav from "../Components/SideNav";
import UpcomingAppointments from "../Components/UpcomingAppointments";
import MyDoctors from "../Components/MyDoctors";
import Blogs from "../Components/Blogs";
import EditModal from "../Components/EditModal";
import { useNavigate } from "react-router-dom";
import UpcomingAppointmentsDoctor from "../Components/UpcomingAppointmentsDoctor";
import MyPatients from "../Components/MyPatients";
export default function Dashboard({
  user,
  setUser,
  count,
  setCount,
  showrating,
  setShowrating,
  actDoc,
  setActDoc
}) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem("userData");
    await setUser({ ...user, isLoggedIn: false });
    navigate("/");
  };
  useEffect(() => {
    setCount(1);
  }, []);
  return (
    <section className=" h-full w-full md:w-[calc(100vw-5rem)]  flex  flex-col md:flex-row justify-center items-center gap-5 ">
      <div className="h-full md:w-[62%] w-full ">
        <h1 className="text-[2rem] font-semibold mb-1 flex flex-col justify-center items-start">
          Upcoming Appointments
        </h1>
        {user.type == "patient" ? (
          <UpcomingAppointments
            user={user}
            setUser={setUser}
            
            showrating={showrating}
            setShowrating={setShowrating}
            actDoc={actDoc}
            setActDoc={setActDoc}
          />
        ) : (
          <UpcomingAppointmentsDoctor user={user} />
        )}

        <h1 className="text-[2rem] font-semibold mb-2">{user.type === 'patient'?"My Doctors":"My Patients"}</h1>

        {user.type == "patient" ? (
          <MyDoctors
            user={user}
            setUser={setUser}
            showrating={showrating}
            setShowrating={setShowrating}
            actDoc={actDoc}
            setActDoc={setActDoc}
          />
        ) : (
          <MyPatients user={user} />
        )}
      </div>
      <div className=" w-[30%] flex flex-col justify-start items-center   h-full">
        {user.type == "patient" ? (
          <div className="bg-white rounded-xl w-full h-full mb-5 md:block hidden relative">
            <div className="flex flex-col justify-center items-center gap-3 mx-3 mb-2 rounded-full h-[15rem] ">
              <img
                src={user.profilePic}
                alt="pic"
                className="w-[6rem] h-[6rem] rounded-full  border-solid border-[3px] border-[#1C4C58]"
              />
              <div className="flex flex-col justify-center items-center  ">
                <p className="text-[2rem] font-semibold mb-2">
                  {user.userName}
                </p>
                <p className="text-gray-400 font-semibold text-[1.2rem] capitalize">
                  {user.type}
                </p>
              </div>
            </div>
            <div className="w-full h-[0.2rem] bg-gray-400"></div>

            <div className="w-full m-2 flex flex-col justify-center items-start gap-2">
              <p className="text-black font-semibold text-[1rem] xl:text-[1.1rem]">
                Gender: {user.gender}
              </p>
              <p className="text-black font-semibold text-[1rem] xl:text-[1.1rem]">
                Blood Group: {user.bloodGroup}
              </p>
              <p className="text-black font-semibold text-[1rem] xl:text-[1.1rem]">
                Age: {user.age}
              </p>
              <p className="text-black font-semibold text-[1rem] xl:text-[1.1rem]">
                Email: {user.email}
              </p>
              <p className="text-black font-semibold text-[0.9rem] xl:text-[1.1rem]">
                Phone Number: {user.mobile}
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
        ) : (
          <div className="bg-white rounded-xl w-full h-full mb-5 md:block hidden relative">
            <div className="flex flex-col justify-center items-center gap-3 mx-3 mb-2  h-[15rem]">
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
        )}

        {/* <Blogs/> */}
      </div>
    </section>
  );
}
