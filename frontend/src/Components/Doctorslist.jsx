import React, { useEffect, useState } from "react";
import star from "../assets/star.svg";
import BookingModal from "./BookingModal";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

export default function Doctorslist({location,special,user, setUser}) {
  const [doctors, setDoctors] = useState([]);
  const [loc, setLoc] = useState(location);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [load, setLoad] = useState(false);
  

  const getData = async () => {
    setLoad(true);
    try {
      const res = await axios.get(`${baseUrl}/doctorsRoute/view`);
      setDoctors(res.data.doctors);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getDoc = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/groupRoute/group?location=${location}`
      );
      setDoctors(response.data.groupDoctors);
      //
    } catch (error) {
      console.log("err");
    }
  };
  const getDocData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/groupRoute/group?speciality=${special}`
      );
      setDoctors(response.data.groupDoctors);
      //
    } catch (error) {
      console.log("err");
    }
  };
  const getDocAll = async () => {
    setLoad(true);
    try {
      const response = await axios.get(
        `${baseUrl}/groupRoute/group?location=${location}&speciality=${special}`
      );
      setLoad(false);
      setDoctors(response.data.groupDoctors);
      //
    } catch (error) {
      console.log("err");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getDocAll();
  }, [special, location]);

  return (
    <section className="w-[90%] py-4 h-full overflow-y-scroll flex flex-row justify-center items-center flex-wrap ">
      {load == true ? (
        <div className="w-full h-full flex justify-center items-center">
          <ClipLoader
            color="#1C4C58"
            size={120}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : doctors.length > 0 ? (
        <div className="flex flex-row w-full justify-center items-center p-2 flex-wrap gap-7  ">
          {doctors &&
            doctors.map((e) => {
              return (
                <div className="py-3 px-1 flex flex-row md:flex-col justify-center gap-8 md:gap-3 items-center flex-wrap w-full md:w-[30%]  bg-white  p-3 rounded-xl relative ">
                  <div className="flex flex-row flex-wrap justify-center items-center gap-1 rounded-3xl border-solid border-[2px] border-orange-200 py-1 px-2 bg-white absolute top-[-1rem] right-[-1rem]">
                    <img src={star} alt="" />
                    <span>{e.rating}</span>
                  </div>
                  <div className="flex flex-row justify-between items-center gap-5 ">
                    <img
                      src={e.profilePic}
                      alt=""
                      className="w-[4rem] h-[4rem] rounded-2xl"
                    />
                    <div className="">
                      <div className="flex flex-row justify-start items-center gap-2 ">
                        <p className="text-[1rem] font-semibold">
                          Name:{e.name}
                        </p>
                      </div>
                      <p className="text-gray-400 font-semibold text-[0.8rem]">
                        Specialization: {e.specialization}
                      </p>

                      <p className="text-gray-400 font-semibold text-[0.8rem]">
                        Experience:{e.experience} yrs
                      </p>
                      <p className="text-gray-400 font-semibold text-[0.8rem]">
                        City:{e.city}
                      </p>
                      <p className="text-gray-400 font-semibold text-[1rem]">
                        Checkup Fees:₹ {e.fees}
                      </p>
                    </div>
                  </div>
                  <div className=" flex flex-row flex-wrap md:flex-col justify-center items-center gap-2 ">
                    <BookingModal 
                      user={user}
                      setUser={setUser}
                      userName={user.fullName}
                      userEmail={user.email}
                      doctorEmail={e.email}
                      fees={e.fees}
                      doctorName={e.name}
                      buttonText={"Book an Appointment"}
                      buttonClassName={"bg-[#1C4C58] rounded-3xl text-white p-2 hover:bg-[#143740] w-full"}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="lg:text-[5rem] md:text-[3.5rem] text-[2rem] text-center font-semibold text-[#1C4C58]">
          No data found
        </div>
      )}
    </section>
  );
}
