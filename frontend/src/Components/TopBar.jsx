import React, { useState,useEffect } from "react";
import logo from "../assets/Logo.png";
import { Link, NavLink } from "react-router-dom";
import Emergency from "../assets/Emergency.png";
import notification from "../assets/Noficition.svg";
import { Slant as Hamburger } from "hamburger-react";
import { Globe } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import EmergencyModal from "./EmergencyModal";
import axios from 'axios';
import Notifications from "./Notifications";
export default function TopBar({
  user,
  setUser,
  mainopen,
  setMainOpen,
  view,
  setView,
  count,
  setCount,
  emergency,
  setEmergency
}) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [close,setClose]=useState(false);
  const handleView = () => {
    setView(!view);
    console.log(view);
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const Call=()=>
  {
    setEmergency(true);
  }
  const Notify=()=>
    {
      setClose(true);
    }
  const fetchNotifications = async () => {
      console.log(user)
      await axios.post(`${baseUrl}/user/notifications`,{user: user})
      .then((res)=>{
        console.log(res);
        setNotifications(res.data.notifications)
      })
      .catch((error)=>{
        console.log(error);
      })
      //setNotifications(response.data);
  };
  useEffect(() => {

    fetchNotifications();
  }, []);
  return (
    <section className="w-full h-[6.5rem] flex justify-between items-center relative">
      <div className="sm:w-full w-[calc(100vw-3rem)] absolute sm:relative top-6 right-0 sm:top-0 flex justify-center items-center">
        <nav className="w-full lg:w-[98%] flex justify-between items-center px-2">
          <ul className="flex flex-row justify-between items-center w-full md:px-5">
            <li>
              <a href="/">
                <img
                  src={logo}
                  alt=""
                  className="w-[4rem] sm:w-full hidden sm:block "
                />
              </a>
            </li>

            <div className="sm:block hidden">
              <h1 className="text-[1.5rem] md:text-[3rem] font-semibold">
                Hello, <span className="text-[#1C4C58]">{user.userName}!</span>
              </h1>
              <p className="md:block hidden text-[1rem] md:text-[1.2rem] text-gray-500 font-medium">
                Check Your Dashboard: Stay Updated and In Control.
              </p>
            </div>

            <div className="relative bg-white p-1 md:p-2 rounded-md border-[4px] border-solid border-gray-300 outline-none flex flex-row justify-center items-center">
              <Globe className="" />

              <select
                id="languages"
                name="languages"
                className="w-16  md:w-28 p-2 rounded-md  outline-none"
              >
                <option value="English">English</option>
                <option value="hindi">Hindi</option>
                <option value="bengali">Bengali</option>
                <option value="telugu">Telugu</option>
                <option value="marathi">Marathi</option>
                <option value="tamil">Tamil</option>
                <option value="urdu">Urdu</option>
                <option value="gujarati">Gujarati</option>
                <option value="malayalam">Malayalam</option>
                <option value="kannada">Kannada</option>
                <option value="odia">Odia</option>
                <option value="punjabi">Punjabi</option>
                <option value="assamese">Assamese</option>
                <option value="maithili">Maithili</option>
                <option value="santali">Santali</option>
                <option value="kashmiri">Kashmiri</option>
                <option value="sindhi">Sindhi</option>
                <option value="konkani">Konkani</option>
                <option value="dogri">Dogri</option>
                <option value="manipuri">Manipuri</option>
                <option value="french">French</option>
                <option value="spanish">Spanish</option>
                <option value="german">German</option>
                <option value="mexican">Mexican</option>
                <option value="italian">Italian</option>
              </select>
            </div>

            <button className="flex flex-col justify-between items-center" onClick={Call}>
              <img src={Emergency} alt="" className="w-[1.5rem] sm:w-[2rem]" />
              <p className="text-[0.8rem] sm:text-[1rem] hidden xsm:block">
                Emergency
              </p>
            </button>
            <div className="flex flex-col justify-end items-center ">
            <button className="flex flex-col justify-center items-center" onClick={Notify}>
              <img
                src={notification}
                alt=""
                className="w-[1.5rem] sm:w-[2rem]"
              />
              <p className="text-[0.8rem] sm:text-[1rem] hidden xsm:block">
                Notification
              </p>
            </button>
            <Notifications close={close} setClose={setClose} notifications={notifications}/>
            </div>

            <button className={`${count==0?"block":"md:hidden block"}`} onClick={handleView}>
              <img
                src={user.profilePic}
                alt=""
                className="w-[2rem] h-[2rem] xsm:w-[4rem] xsm:h-[4rem] rounded-full border-solid border-[3px] border-[#1C4C58]"
              />
            </button>
          </ul>
        </nav>
      </div>
      <EmergencyModal emergency={emergency} setEmergency={setEmergency}/>
      
      
      
    </section>
  );
}
