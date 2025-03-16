import React from "react";
import { CircleX } from "lucide-react";
import EditModal from "./EditModal";
import { useNavigate } from "react-router-dom";
export default function Profile({
  user,
  setUser,
  view,
  setView,
  count,
  setCount,
}) {
  const navigate = useNavigate();
  const handleClose = () => {
    setView(!view);
  };
  const handleLogout = async () => {
    localStorage.removeItem("userData");
    await setUser({ ...user, isLoggedIn: false });
    navigate("/");
    setView(!view);
  };

  return (
    <div
      className={`z-50 modal shadow-lg shadow-gray-500 bg-white rounded-xl w-[90%] sm:w-[30%] h-[90%] sm:h-[75%] mb-5 absolute top-[50%] left-[50%] ${
        view ? "block" : "hidden"
      } `}
    >
      <div className="flex flex-col justify-center items-center gap-3 mx-3 mb-2  h-[15rem] relative">
        <button
          className="absolute top-2 right-2 hover:scale-105 transition-all ease-linear duration-100"
          onClick={handleClose}
        >
          <CircleX className=" text-[2rem]" />
        </button>
        <img
          src={user.profilePic}
          alt="pic"
          className="w-[6rem] h-[6rem] rounded-full border-solid border-[3px] border-[#1C4C58]"
        />
        <div className="flex flex-col justify-center items-center">
          <p className="text-[2rem] font-semibold mb-2">{user.userName}</p>
          <p className="text-gray-400 font-semibold text-[1.2rem]">
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
  );
}
