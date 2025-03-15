import React, { useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "./ui/animated-modal";
import { motion, AnimatePresence } from "framer-motion";
import { User, BriefcaseMedical } from 'lucide-react';

export default function AuthModal() {
  const [mode, setMode] = useState('login');
  const [selectedRole, setSelectedRole] = useState(null);  

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const renderContent = () => {
    switch (mode) {
      case 'register':
        return (
          <motion.div
            key="register"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-lg text-[#1C4C58] md:text-2xl font-bold text-center mb-4">
              Register
            </h4>
            <div className="flex flex-col w-full items-center justify-center mx-auto">
              <input
                type="text"
                placeholder="Name"
                className="mb-3 p-2 bg-transparent text-[#1C4C58] border-b-2 outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
              />
              <input
                type="email"
                placeholder="Email"
                className="mb-3 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
              />
              <input
                type="password"
                placeholder="Password"
                className="mb-3 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="mb-3 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
              />
              <div className="w-full text-[#1C4C58]">
                <p>Who are you?</p>
                <div className="flex flex-row my-2 gap-4">
                  <button
                    className={`rounded-xl flex flex-col justify-center items-center w-[5rem] h-[5rem] border-2 border-[#1C4C58] ${selectedRole === 'patient' ? 'bg-[#1C4C58] text-white' : 'bg-white text-[#1C4C58]'}`}
                    onClick={() => handleRoleSelect('patient')}
                  >
                    <User className="w-8 h-8" />
                    <p className="text-[0.9rem]">Patient</p>
                  </button>
                  <button
                    className={`rounded-xl flex flex-col justify-center items-center w-[5rem] h-[5rem] border-2 border-[#1C4C58] ${selectedRole === 'doctor' ? 'bg-[#1C4C58] text-white' : 'bg-white text-[#1C4C58]'}`}
                    onClick={() => handleRoleSelect('doctor')}
                  >
                    <BriefcaseMedical className="w-8 h-8" />
                    <p className="text-[0.9rem]">Doctor</p>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-4 w-full my-4 flex-col items-center justify-center">
              <button className="px-4 py-2 w-full text-white bg-[#1C4C58] p-2 rounded-[2rem] flex justify-center items-center border-[2px] border-white hover:bg-white hover:text-[#1C4C58] hover:border-[#1C4C58] transition-all ease-linear duration-150">
                Register
              </button>
              <p>Already a user? <span onClick={() => setMode('login')} className="cursor-pointer text-blue-500 hover:underline">Login</span></p>
            </div>
          </motion.div>
        );
      case 'forgotPassword':
        return (
          <motion.div
            key="forgotPassword"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-lg md:text-2xl font-bold text-center mb-8">
              Reset Password
            </h4>
            <div className="flex flex-col w-full items-center justify-center mx-auto">
              <input
                type="email"
                placeholder="Email"
                className="mb-4 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
              />
              <input
                type="password"
                placeholder="New Password"
                className="mb-4 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="mb-4 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
              />
            </div>
            <div className="flex gap-4 w-full flex-col items-center my-4 justify-center">
              <button className="px-4 py-2 w-full text-white bg-[#1C4C58] p-2 rounded-[2rem] flex justify-center items-center border-[2px] border-white hover:bg-white hover:text-[#1C4C58] hover:border-[#1C4C58] transition-all ease-linear duration-150">
                Reset Password
              </button>
              <p>Already a user? <span onClick={() => setMode('login')} className="cursor-pointer text-blue-500 hover:underline">Login</span></p>
            </div>
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="login"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-lg md:text-2xl font-bold text-center mb-8">
              Login
            </h4>
            <div className="flex flex-col w-full items-center justify-center mx-auto">
              <input
                type="email"
                placeholder="Email"
                className="mb-4 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
              />
              <input
                type="password"
                placeholder="Password"
                className="mb-4 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
              />
              <a onClick={() => setMode('forgotPassword')} className="text-sm w-full text-right text-blue-500 hover:underline mb-6 cursor-pointer">
                Forgot Password?
              </a>
            </div>
            <div className="flex gap-4 w-full flex-col items-center justify-center">
              <button className="px-4 py-2 w-full text-white bg-[#1C4C58] p-2 rounded-[2rem] flex justify-center items-center border-[2px] border-white hover:bg-white hover:text-[#1C4C58] hover:border-[#1C4C58] transition-all ease-linear duration-150">
                Login
              </button>
              <p>New user? <span onClick={() => setMode('register')} className="cursor-pointer text-blue-500 hover:underline">Register Now</span></p>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="mx-4">
      <Modal>
        <ModalTrigger className="flex justify-center">
          <button className="xsm:mx-2 mx-1 text-center text-[#1C4C58] bg-white p-2 rounded-[2rem] flex justify-center items-center border-[2px] border-[solid] border-[#1C4C58] hover:bg-[#1C4C58] hover:text-white hover:border-[#ffffff] transition-all ease-linear duration-150">
            Start now
          </button>
        </ModalTrigger>
        <ModalBody className="mx-4 bg-[#F4D5D4] rounded-lg">
          <ModalContent className="w-full">
            <AnimatePresence mode="popLayout">
              {renderContent()}
            </AnimatePresence>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
