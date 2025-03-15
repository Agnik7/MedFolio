import React from "react";
import logo from "../assets/Logo.png";
import { Link, NavLink } from "react-router-dom";
import emergency from "../assets/Emergency.png";
import notification from "../assets/Noficition.svg";
export default function TopBar({user,setUser}) {
  return (
    <section className={`  w-full h-[6.5rem] flex justify-between items-center`}>
      <div className="w-full p-4">
        <nav>
          <ul className="flex flex-row justify-between items-center w-full">
            <li>
              <a href="/">
                <img src={logo} alt="" />
              </a>
            </li>
            <div className="w-[50%]">
              <h1 className="text-[3rem] font-semibold">Hello,<span className="text-[#1C4C58]"> {user.userName} !</span> </h1>
              <p className="text-[1.2rem] text-gray-500 font-medium">Check Your Dashboard: Stay Updated and In Control.</p>
            </div>
            <select
              id="languages" name="languages"
              className=" w-28 p-2 rounded-md border-[4px] border-solid border-gray-300 outline-none"
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
            <button className="flex flex-col justify-center items-center">
              <img src={emergency} alt="" />
              <p>Emergency</p>
            </button>
            <button className="flex flex-col justify-center items-center">
              <img src={notification} alt="" />
              <p>Notification</p>
            </button>
          </ul>
        </nav>
      </div>
    </section>
  );
}
