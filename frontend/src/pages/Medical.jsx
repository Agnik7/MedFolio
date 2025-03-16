import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Medical({ count, setCount }) {
  const [tests, setTests] = useState([]);
  const [location, setLocation] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [city, setCity] = useState("Kolkata");
  const [test, setTest] = useState("Blood Test");
  const [center, setCenter] = useState([]);
  const [place, setPlace] = useState("Kolkata Diagnostic Center");
  const [fee, setFee] = useState(0);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [loc, setLoc] = useState(false);
  const [medi, setMedi] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const getData = async () => {
    setLoc(true);
    setMedi(true);
    try {
      const response = await axios.get(`${baseUrl}/testRoute/list`);
      setLoc(false);
      setLocation(response.data.outputArray);

      const res = await axios.get(`${baseUrl}/test/list`);
      setMedi(false);
      setTests(res.data.outputArray);
    } catch (error) {
      console.log("err");
    }
  };
  const getTestData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/testGroup/group?city=${city}&test=${test}`
      );
      setCenter(response.data.outputArray);
    } catch (error) {
      console.log("err");
    }
  };
  const getFeeData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/feeRoute/fee?name=${place}&test=${test}&city=${city}`
      );
      setFee(response.data.fees);
    } catch (error) {
      console.log("err");
    }
  };
  useEffect(() => {
    setCount(0);
  }, []);
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getTestData();
  }, [city, test]);
  useEffect(() => {
    getFeeData();
  }, [test, place, city]);

  return (
    <section className="test h-full w-full md:w-[calc(100vw-15rem)]   flex justify-center items-center">
      <div className="2xsm:w-[25rem] w-[20rem] flex justify-center items-center flex-col gap-5 bg-[#1C4C58] rounded-3xl shadow-lg shadow-gray-500 text-white p-4">
        <h1 className="text-[3rem] w-full text-center">Test Booking</h1>

        <div className="flex flex-row  w-full justify-between items-center ">
          <div className="flex flex-col justify-start items-start">
            <label for="cities text-[1.2rem]">Choose a city:</label>
            <select
              id="cities"
              name="cities"
              className="text-black 2xsm:w-[10rem] w-[7rem] outline-none"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              {loc == true ? (
                <option value="Load">Loading...</option>
              ) : (
                location.map((e) => {
                  return <option value={e}>{e}</option>;
                })
              )}
            </select>
          </div>
          <div className="flex flex-col justify-start items-start">
            <label for="cities text-[1.2rem]">Choose Your test:</label>
            <select
              id="cities"
              name="cities"
              className="text-black outline-none 2xsm:w-[10rem] w-[7rem]"
              value={test}
              onChange={(e) => setTest(e.target.value)}
            >
              {medi == true ? (
                <option value="load">Loading..</option>
              ) : (
                tests.map((e) => {
                  return <option value={e}>{e}</option>;
                })
              )}
            </select>
          </div>
        </div>

        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-col justify-start items-start">
            <label htmlFor="appointment-date text-[1.2rem]">
              Select a Date:
            </label>
            <DatePicker
              id="appointment-date"
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MMMM d, yyyy"
              placeholderText="Click to select a date"
              className="date-picker outline-none 2xsm:w-[10rem] w-[7rem] text-black pl-[0.1rem]"
            />
          </div>
          <div className="flex flex-col justify-start items-start">
            <label for="cities text-[1.2rem]">Time:</label>
            <select id="cities" className=" text-black w-[10rem] outline-none">
              <option value="8am-1pm">8 a.m. To 10 a.m.</option>
              <option value="4pm-11pm">4p.m. To 11 p.m.</option>
            </select>
          </div>
        </div>

        <div className="flex flex-row w-full justify-between items-end">
          <div className="flex flex-col justify-start items-start">
            <label for="cities text-[1.2rem]">Choose a center:</label>
            <select
              id="cities"
              name="cities"
              className="text-black 2xsm:w-[10rem] w-[7rem] outline-none"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            >
              {center.map((e) => {
                return <option value={e}>{e}</option>;
              })}
            </select>
          </div>
          <div className="flex flex-row justify-start items-start gap-1">
            <span>Price:</span>
            <input
              type="text"
              value={`₹ ${fee}`}
              className="2xsm:w-[8rem] w-[7rem] outline-none pl-2"
              disabled
            />
          </div>
        </div>
        <button className="bg-white text-[#1C4C58] w-full rounded-[6rem] p-2 my-2 text-[1.2rem] font-bold hover:text-white hover:bg-[#1C4C58] transition-all ease-linear duration-150 hover:border-solid hover:border-[1px] hover:border-white">
          Book Now
        </button>
      </div>
    </section>
  );
}
