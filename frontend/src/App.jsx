import React, { useState, useEffect } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import AppointmentPage from "./pages/AppointmentPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Medical from "./pages/Medical";
import DiseaseChecker from "./pages/DiseaseChecker";
import Dashboard from "./pages/Dashboard";
import Medicine from "./pages/Medicine";
import Doctors from "./pages/Doctors";

import SideNav from "./Components/SideNav";
import TopBar from "./Components/TopBar";
import { Slant as Hamburger } from "hamburger-react";
import medicine from "./assets/medicine.svg";
import aid from "./assets/aid.svg";
import bot from "./assets/Bot.svg";
import doctor from "./assets/Doctor.svg";
import box from "./assets/box.svg";
import logo from "./assets/Logo.png";
import Profile from "./Components/Profile";
import DoctorProfile from "./Components/DoctorProfile";
import EmergencyModal from "./Components/EmergencyModal";
import Rating from "./Components/Rating";
function App() {
  const [emergency, setEmergency] = useState(false);
  const [checkName, setCheckName] = useState(1);
  const [showrating, setShowrating] = useState(false);
  const [user, setUser] = useState({
    email: "",
    profilePic: "",
    isLoggedIn: false,
    fullName: "",
    userName: "",
    type: "",
    specialization: "",
    experience: "",
    appointments: [],
    rating: 0,
    searchHistory: [],
    tests: [],
    city: "",
    fees: 0,
    token: "",
    gender: "",
    age: "",
    bloodGroup: "",
    mobile: 0,
  });
  const [mainopen, setMainOpen] = useState(false);
  const [view, setView] = useState(false);
  const [count, setCount] = useState(0);
  const [actDoc, setActDoc] = useState("");
  const handleOpen = () => {
    setMainOpen(!mainopen);
  };
  useEffect(() => {
    if (user.isLoggedIn === true)
      localStorage.setItem("userData", JSON.stringify(user));
  }, [user.isLoggedIn]);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    
    if (userData) {
      setUser({ ...userData });
    } else {
      setUser({
        email: "",
    profilePic: "",
    isLoggedIn: false,
    fullName: "",
    userName: "",
    type: "",
    specialization: "",
    experience: "",
    appointments: [],
    rating: 0,
    searchHistory: [],
    tests: [],
    city: "",
    fees: 0,
    token: "",
    gender: "",
    age: "",
    bloodGroup: "",
    mobile: 0,
      });
    }
  }, []);
  return (
    <section className="relative min-h-screen bg-[#d9e1e9] m-0">
      {user.isLoggedIn && (
        <TopBar
          user={user}
          setUser={setUser}
          mainopen={mainopen}
          setMainOpen={setMainOpen}
          view={view}
          setView={setView}
          count={count}
          setCount={setCount}
          emergency={emergency}
          setEmergency={setEmergency}
        />
      )}
      <div
        className={`${
          user.isLoggedIn
            ? "flex justify-between items-center h-[calc(100vh-6rem)] w-full z-0"
            : ""
        } `}
      >
        <Router>
          {user.isLoggedIn && <SideNav user={user} setUser={setUser} />}
          <Routes>
            {user.isLoggedIn ? (
              <>
                <Route
                  path="/"
                  index
                  element={<Navigate to={`/${user.userName}/dashboard`} />}
                />
                <Route
                  path="/:username/dashboard"
                  element={
                    <Dashboard
                      user={user}
                      setUser={setUser}
                      count={count}
                      setCount={setCount}
                      showrating={showrating}
                      setShowrating={setShowrating}
                      actDoc={actDoc}
                      setActDoc={setActDoc}
                    />
                  }
                />
                <Route
                  path="/:username/disease"
                  element={
                    <DiseaseChecker
                      user={user}
                      setUser={setUser}
                      count={count}
                      setCount={setCount}
                    />
                  }
                />
                <Route
                  path="/:username/tests"
                  element={
                    <Medical
                      user={user}
                      setUser={setUser}
                      count={count}
                      setCount={setCount}
                    />
                  }
                />
                <Route
                  path="/:username/doctors"
                  element={
                    <Doctors
                      user={user}
                      setUser={setUser}
                      count={count}
                      setCount={setCount}
                    />
                  }
                />
                <Route
                  path="/:username/medicine"
                  element={
                    <Medicine
                      user={user}
                      setUser={setUser}
                      count={count}
                      setCount={setCount}
                    />
                  }
                />
              </>
            ) : (
              <>
                <Route
                  path="/"
                  index
                  element={
                    <LandingPage
                      user={user}
                      setUser={setUser}
                      checkName={checkName}
                      setCheckName={setCheckName}
                      setCount={setCount}
                    />
                  }
                />
                <Route
                  path="/:username/dashboard"
                  index
                  element={<Navigate to={"/"} />}
                />
                <Route path="/disease" element={<Navigate to={"/"} />} />
                <Route path="/test" element={<Navigate to={"/"} />} />
                <Route path="/doctors" element={<Navigate to={"/"} />} />
                <Route path="/medicine" element={<Navigate to={"/"} />} />
              </>
            )}
            <Route
              path="/appointment/:roomId"
              element={<AppointmentPage user={user} setUser={setUser} />}
            />
          </Routes>
        {user.type == "patient" ? (
          <Profile
            user={user}
            setUser={setUser}
            view={view}
            setView={setView}
            count={count}
            setCount={setCount}
          />
        ) : (
          <DoctorProfile user={user} setUser={setUser} view={view} setView={setView} />
        )}
        </Router>
      </div>
      <Rating
        showrating={showrating}
        setShowrating={setShowrating}
        user={user}
        setUser={setUser}
        actDoc={actDoc}
        setActDoc={setActDoc}
      />

      <button
        className={`${
          checkName == 1 && user.isLoggedIn === true ? "block" : "hidden"
        } z-40 block sm:hidden bg-[#1C4C58] rounded-full p-1 absolute top-5 left-1`}
        onClick={handleOpen}
      >
        <Hamburger color="#BAC9D5" />
      </button>
      <div
        className={`${
          checkName == 1 ? "block" : "hidden"
        } hamburger_block z-10 min-h-screen sm:hidden ${
          mainopen ? "translate-x-[0rem]" : "translate-x-[-50rem]"
        } backdrop-blur-md bg-[#BAC9D5]  w-full fixed flex flex-col justify-center items-center transition-all ease-linear duration-300  top-0 `}
      >
        <ul className=" py-4  flex flex-col justify-between items-center gap-4  h-full  w-full rounded-tr-[2rem] text-white">
          <a href="/">
            <img src={logo} alt="" className="w-[8rem] block" />
          </a>
          <a
            href={`/${user.userName}/dashboard`}
            className="w-[80%] hover:bg-[#133139] flex flex-col justify-center items-center p-2 rounded-3xl border-[4px] border-solid border-gray-500 bg-[#1C4C58] h-[4rem]"
          >
            <img src={box} alt="" className="w-[1rem]" />
            <p className="text-center text-[1rem]">Dashboard</p>
          </a>
          <a
            href={`/${user.userName}/disease`}
            className="w-[80%] hover:bg-[#133139] flex flex-col justify-center items-center  p-3 rounded-3xl border-[4px] border-solid border-gray-500 bg-[#1C4C58] h-[4rem]"
          >
            <img src={bot} alt="" className="w-[1rem]" />
            <p className="text-center text-[1rem]">Disease Checker</p>
          </a>
          <a
            href={`/${user.userName}/test`}
            className="w-[80%]  hover:bg-[#133139] flex flex-col justify-center items-center  p-3 rounded-3xl border-[4px] border-solid border-gray-500 bg-[#1C4C58] h-[4rem]"
          >
            <img src={aid} alt="" className="w-[1rem]" />
            <p className="text-center text-[1rem]">Medical Tests</p>
          </a>
          <a
            href={`/${user.userName}/doctors`}
            className="w-[80%]  hover:bg-[#133139] flex flex-col justify-center items-center  p-3 rounded-3xl border-[4px] border-solid border-gray-500 bg-[#1C4C58] h-[4rem]"
          >
            <img src={doctor} alt="" className="w-[1rem]" />
            <p className="text-center text-[1rem]">Doctors</p>
          </a>
          <a
            href={`/${user.userName}/medicine`}
            className="w-[80%] hover:bg-[#133139] flex flex-col justify-center items-center  p-4 rounded-3xl border-[4px] border-solid border-gray-500 bg-[#1C4C58] h-[4rem]"
          >
            <img src={medicine} alt="" className="w-[1rem]" />
            <p className="text-center text-[1rem]">Medicines</p>
          </a>
        </ul>
      </div>
    </section>
  );
}

export default App;
