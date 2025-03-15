import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "./ui/animated-modal";
import { motion, AnimatePresence } from "framer-motion";
import { User, BriefcaseMedical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { LoaderCircle } from 'lucide-react';
export default function AuthModal({ user, setUser, authClass, itemVariants }) {
  const [mode, setMode] = useState('login');
  const [selectedRole, setSelectedRole] = useState('patient');
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const swal = withReactContent(Swal)
  const [check,setCheck]=useState(true);
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [specialty,setSpecialty] = useState("");
  const [fees,setFees] = useState();
  const [experience,setExperience] = useState();
  const [city,setCity] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState();
  const [bloodGroup, setBloodGroup] = useState("");
  const [mobile, setMobile] = useState();
  const specializations = [
    'Allergist and Immunologist',
    'Anesthesiologist',
    'Dermatologist',
    'Emergency Medicine Specialist',
    'Family Medicine Physician',
    'Internal Medicine Physician',
    'Medical Geneticist',
    'Neurologist',
    'Nuclear Medicine Specialist',
    'Obstetrician and Gynecologist',
    'Ophthalmologist',
    'Pathologist',
    'Pediatrician',
    'Physical Medicine and Rehabilitation Specialist',
    'Preventive Medicine Specialist',
    'Psychiatrist',
    'Radiologist',
    'Surgeon',
    'Urologist',
    'Cardiologist',
    'Endocrinologist',
    'Gastroenterologist',
    'Hematologist',
    'Infectious Disease Specialist',
    'Nephrologist',
    'Oncologist',
    'Pulmonologist',
    'Rheumatologist',
    'General Practitioner'
];
  const handleRoleSelect = (role) => {
    setSelectedRole(role); 
  };

  const clear = ()=>{
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setSpecialty("");
    setFees();
    setExperience();
    setCity("");
    setGender("");
    setAge();
    setBloodGroup("");
    setMobile();
  }

  const navigate = useNavigate();
  const [checkRegister,setCheckRegister]=useState(true);
  const handleRegister = async () => {
    setCheckRegister(false);
    let doctorFees;
    let newUser = {
      name: name,
      email: email,
      password: password,
      userType: "patient",
      gender:gender,
      age:age,
      bloodGroup: bloodGroup,
      mobile: mobile
    };
    if (password !== confirmPassword) {
      swal.fire({
        title: <p>An Unexpected error occurred</p>,
        text: "Passwords Dont Match",
        icon: "error"
      });
    } 
    else {
      if (selectedRole === 'doctor') {
        newUser.userType = 'doctor';
        newUser.specialization = specialty;
        newUser.fees = fees;
        newUser.experience = experience;
        newUser.city = city;
      }
      await axios.post(`${baseUrl}/user/register`, newUser)
        .then((res) => {
          setCheckRegister(true);
          let firstName = res.data.user.name.split(' ')[0];
        if (res.data.user.type === 'doctor') {
          firstName = res.data.user.name.startsWith('Dr. ') 
            ? res.data.user.name.split(' ')[1] 
            : firstName;
        }
          setUser({
            fullName: res.data.user.name,
          userName: firstName,
          email: res.data.user.email,
          profilePic: res.data.user.profilePic,
          type: res.data.user.type,
          token: res.data.user.token,
          isLoggedIn: true,
          specialization: res.data.user.specialization,
          fees: res.data.user.fees,
          rating: res.data.user.rating,
          gender:res.data.user.gender,
          age:res.data.user.age,
          bloodGroup:res.data.user.bloodGroup,
          appointments: res.data.user.appointments,
          searchHistory: res.data.user.search_history,
          tests: res.data.user.tests,
          city: res.data.user.city,
          mobile: res.data.user.mobile,
          experience: res.data.user.experience
          });
          
          swal.fire({
            title: "Successful!",
            text: "User Registered Successfully",
            icon: "success"
          }).then(() => {
            navigate(`/${firstName}/dashboard`);
          });
        })
        .catch((error) => {
          console.log(error);
          swal.fire({
            title: <p>An Unexpected error occurred</p>,
            text: error.response.data,
            icon: "error"
          });
        });
      clear();
    }
  };

  const handleLogin = async () => {
    setCheck(false);
    await axios.post(`${baseUrl}/user/login`, {
      email: email,
      password: password,
      userType: selectedRole
    })
      .then((res) => {
        setCheck(true);
        console.log(res)
        let firstName = res.data.user.name.split(' ')[0];
        if (res.data.user.type === 'doctor') {
          firstName = res.data.user.name.startsWith('Dr. ') 
            ? res.data.user.name.split(' ')[1] 
            : firstName;
        }
        setUser({
          fullName: res.data.user.name,
          userName: firstName,
          email: res.data.user.email,
          profilePic: res.data.user.profilePic,
          type: res.data.user.type,
          token: res.data.user.token,
          isLoggedIn: true,
          specialization: res.data.user.specialization,
          fees: res.data.user.fees,
          rating: res.data.user.rating,
          gender:res.data.user.gender,
          age:res.data.user.age,
          bloodGroup:res.data.user.bloodGroup,
          appointments: res.data.user.appointments,
          searchHistory: res.data.user.search_history,
          tests: res.data.user.tests,
          city: res.data.user.city,
          mobile: res.data.user.mobile,
          experience: res.data.user.experience
        });
        swal.fire({
          title: "Successful!",
          text: "User Logged In Successfully",
          icon: "success"
        }).then(() => {
          navigate(`/${firstName}/dashboard`);
        });
      })
      .catch((error) => {
        swal.fire({
          title: <p>An Unexpected error occurred</p>,
          text: error.response.data.message,
          icon: "error"
        });
      });
    clear();
  };
  const [checkReset,setCheckReset]=useState(true);
  const handleReset = async () => {
    setCheckReset(false);
    //alert(baseUrl);
    if (password !== confirmPassword) {
      console.log("Passwords don't match");
    } else {
      await axios.post(`${baseUrl}/user/reset`, {
        email: user.email,
        password: password
      })
        .then((res) => {
          setCheckReset(true);
          console.log(res);
          swal.fire({
            title: "Successful!",
            text: "Password Reset Successfully",
            icon: "success"
          });
        })
        .catch((error) => {
          console.log(error);
        });
      clear();
    }
  };

  useEffect(() => {
    clear();
  }, [mode]);

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
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
                placeholder="Name"
                className="mb-3 p-2 bg-transparent text-[#1C4C58] border-b-2 outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
              />
              <input
                type="email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                placeholder="Email"
                className="mb-3 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
              />
              <input
                type="password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                placeholder="Password"
                className="mb-3 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
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
                {selectedRole === 'doctor' ? (
                  <div className="w-full mt-3">
                    <select 
                      value={specialty} 
                      onChange={(e) => setSpecialty(e.target.value)} 
                      className="mb-3 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none border-black w-full">
                      <option value="" disabled>Your Specialty</option>
                      {specializations.map((specialization, index) => (
                        <option key={index} value={specialization}>
                          {specialization}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={fees}
                      onChange={(e) => setFees(e.target.value)}
                      placeholder="Fees per Appointment"
                      className="mb-3 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
                    />
                    <input
                      type="number"
                      placeholder="Years of Experience"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="mb-3 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
                    />
                    <input
                      type="text"
                      placeholder="Your City"
                      value={city}
                      onChange={(e) => setCity( e.target.value)}
                      className="mb-3 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
                    />
                  </div>
                ):(<>
                  <select value={gender} onChange={(e) => setGender( e.target.value)} className="mb-3 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none border-black w-full">
                <option value="" disabled>Your Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Your Age"
                className="mb-3 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
              />
              <select value={bloodGroup} onChange={(e) => setBloodGroup( e.target.value)} className="mb-3 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none border-black w-full">
                <option value="" disabled>Your Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O- </option>
              </select>
              <input
                type="number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Your Contact No."
                className="mb-3 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
              />
                </>)}
              </div>
              
            </div>
            <div className="flex gap-4 w-full my-4 flex-col items-center justify-center">
              <button className="px-4 py-2 w-full text-[1.1rem] text-white bg-[#1C4C58] p-2 rounded-[2rem] flex justify-center items-center border-[2px] hover:bg-white hover:text-[#1C4C58] border-[#1C4C58] transition-all ease-linear duration-150"
                onClick={handleRegister}
              >
                <div className={`${checkRegister==false?"block animate-spin":"hidden"} `}>
                <LoaderCircle />
                </div>
                <p className={`${checkRegister==true?"block":"hidden"} `}>Register</p>
              </button>
              <p>Already a user? <span onClick={() => setMode('login')} className="cursor-pointer text-[#1C4C58] font-medium hover:underline">Login</span></p>
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
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                placeholder="Email"
                className="mb-3 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
              />
              <input
                type="password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                placeholder="Password"
                className="mb-3 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                placeholder="Confirm Password"
                className="mb-3 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
              />
            </div>
            <div className="flex gap-4 w-full flex-col items-center my-4 justify-center">
              <button className="px-4 py-2 w-full text-[1.1rem] text-white bg-[#1C4C58] p-2 rounded-[2rem] flex justify-center items-center border-[2px] hover:bg-white hover:text-[#1C4C58] border-[#1C4C58] transition-all ease-linear duration-150"
                onClick={handleReset}
              >
                <div className={`${checkReset==false?"block animate-spin":"hidden"} `}>
                <LoaderCircle />
                </div>
                <p className={`${checkReset==true?"block":"hidden"} `}>Reset Password</p>
              </button>
              <p>Back to <span onClick={() => setMode('login')} className="cursor-pointer text-[#1C4C58] font-medium hover:underline">Login</span></p>
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
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                placeholder="Email"
                className="mb-3 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="mb-3 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
              />
              <a onClick={() => setMode('forgotPassword')} className="text-sm w-full text-right text-[#1C4C58] font-medium hover:underline mb-6 cursor-pointer">
                Forgot Password?
              </a>
              <div className="w-full text-[#1C4C58]">
                <p>Select your role:</p>
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
            <div className="flex gap-4 w-full flex-col items-center justify-center">
              <button className={`  px-4  py-2 w-full text-[1.1rem] text-white bg-[#1C4C58] p-2 rounded-[2rem] flex justify-center items-center border-[2px] hover:bg-white hover:text-[#1C4C58] border-[#1C4C58] transition-all ease-linear duration-150`}
                onClick={handleLogin}
              >
                <div className={`${check==false?"block animate-spin":"hidden"} `}>
                <LoaderCircle />
                </div>
                <p className={`${check==true?"block":"hidden"} `}>Login</p>
                
                
              </button>
              <p>New user? <span onClick={() => setMode('register')} className="cursor-pointer text-[#1C4C58] font-medium hover:underline">Register Now</span></p>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className={authClass ? "mx-0" : "mx-4"}>
      <Modal>
        <ModalTrigger className="flex justify-center">
          <motion.button variants={itemVariants} className={authClass ? authClass : "xsm:mx-2 mx-1 text-center text-[#1C4C58] bg-white p-2 rounded-[2rem] flex justify-center items-center border-[2px] border-[solid] border-[#1C4C58] hover:bg-[#1C4C58] hover:text-white transition-all ease-linear duration-150"}>
            Start now
          </motion.button>
        </ModalTrigger>
        <ModalBody className="mx-4 bg-[#BAC9D5] rounded-lg">
          <ModalContent className="w-full overflow-x-hidden overflow-y-auto">
            <AnimatePresence mode="popLayout">
              {renderContent()}
            </AnimatePresence>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
