import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "./ui/animated-modal";
import { motion, AnimatePresence } from "framer-motion";
import { User, BriefcaseMedical, UserRoundPen, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { uploadImageToFirebase } from '../../firebase/firebase.init';
export default function EditModal({ user, setUser, authClass, itemVariants }) {
  const [mode, setMode] = useState('login');
  const [selectedRole, setSelectedRole] = useState(user.type);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const swal = withReactContent(Swal);

  const [name, setName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [specialty, setSpecialty] = useState(user.specialization);
  const [fees, setFees] = useState(user.fees);
  const [experience, setExperience] = useState(user.experience);
  const [city, setCity] = useState(user.city);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [bloodGroup, setBloodGroup] = useState(user.bloodGroup);
  const [mobile, setMobile] = useState(user.mobile);
  const [pic, setPic] = useState(user.profilePic);
  const [newPic, setNewPic] = useState(null);
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
  const clear = () => {
    setName("");
    setEmail("");
    setSpecialty("");
    setFees();
    setExperience();
    setCity("");
    setGender("");
    setAge();
    setBloodGroup("");
    setMobile();
  };

  const navigate = useNavigate();

  const handlePicChange = async(event) => {
    if (event.target.files && event.target.files[0]) {
        const downloadURL = await uploadImageToFirebase(event.target.files[0]);
        console.log(downloadURL)
        setPic(downloadURL);
    }
  };

  const handleEdit = async () => {
    let doctorFees;
    let newUser = {
      name: name,
      email: email,
      userType: user.type,
      gender:gender,
      profilePic:pic,
      age:age,
      bloodGroup: bloodGroup,
      mobile: mobile
    };
      if (selectedRole === 'doctor') {
        newUser.userType = 'doctor';
        newUser.specialization = specialty;
        newUser.fees = fees;
        newUser.experience = experience;
        newUser.city = city;
      }
      await axios.post(`${baseUrl}/user/edit`, newUser)
        .then((res) => {
          const firstName = res.data.user.name.split(' ')[0];
          console.log(res.data)
          const updatedUser = {
            ...user,
            fullName: res.data.user.name,
            userName: firstName,
            email: res.data.user.email,
            profilePic: res.data.user.profilePic,
            type: res.data.user.type,
            specialization: res.data.user.specialization,
            fees: res.data.user.fees,
            gender:res.data.user.gender,
            age:res.data.user.age,
            bloodGroup:res.data.user.bloodGroup,
            city: res.data.user.city,
            mobile: res.data.user.mobile
          }
          setUser({
            ...user,
            fullName: res.data.user.name,
            userName: firstName,
            email: res.data.user.email,
            profilePic: res.data.user.profilePic,
            type: res.data.user.type,
            specialization: res.data.user.specialization,
            fees: res.data.user.fees,
            gender:res.data.user.gender,
            age:res.data.user.age,
            bloodGroup:res.data.user.bloodGroup,
            city: res.data.user.city,
            mobile: res.data.user.mobile
          });
          localStorage.setItem("userData", JSON.stringify(updatedUser));
          swal.fire({
            title: "Successful!",
            text: "Profile Edited Successfully",
            icon: "success"
          })
        })
        .catch((error) => {
          console.log(error);
          swal.fire({
            title: <p>An Unexpected error occurred</p>,
            text: error.response.data,
            icon: "error"
          });
        });
    
  };

  return (
    <div>
      <Modal>
        <ModalTrigger className="flex justify-center">
          <motion.button className="underline text-black text-[1rem] font-bold">
            Edit Profile
          </motion.button>
        </ModalTrigger>
        <ModalBody className="mx-4 bg-[#BAC9D5] rounded-lg">
          <ModalContent className="w-full overflow-x-hidden overflow-y-auto">
            <AnimatePresence mode="popLayout">
              <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h4 className="text-lg text-[#1C4C58] md:text-2xl font-bold text-center mb-4">
                  Edit Profile
                </h4>
                <div className=' w-full flex justify-center items-center'>
                    <div className='relative'>
                    <img src={pic} alt="Profile" className="w-[7rem] h-[7rem] rounded-full" />
                    <label htmlFor="pic-upload" className="absolute bottom-0 right-1 cursor-pointer bg-[#1C4C58] p-1  rounded-full">
                        <Pencil className="w-[1.5rem] aspect-square text-white" />
                        <input
                        id="pic-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePicChange}
                        />
                    </label>
                    </div>
                </div>
                <div className="flex flex-col w-full items-center justify-center mx-auto">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="mb-3 p-2 bg-transparent text-[#1C4C58] border-b-2 outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="mb-3 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
                  />
                  <div className="w-full text-[#1C4C58]">
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
                          type="text"
                          value={fees}
                          onChange={(e) => setFees(e.target.value)}
                          placeholder="Consultation Fees"
                          className="mb-3 p-2 bg-transparent text-[#1C4C58] border-b-2 outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
                        />
                        <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="mb-3 p-2 bg-transparent text-[#1C4C58] border-b-2 outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
                  />
                        <input
                          type="text"
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          placeholder="Experience"
                          className="mb-3 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
                        />
                      </div>
                    ) : (
                      <>
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
                    placeholder="Age"
                    className="mb-3 p-2 bg-transparent text-[#1C4C58] border-b-2 outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
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
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Mobile Number"
                    className="mb-3 p-2 bg-transparent text-[#1C4C58] border-b-2 outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full"
                  />
                      </>
                    )}
                  </div>
                  
                  
                  <motion.button
                    onClick={handleEdit}
                    whileTap={{ scale: 0.95 }}
                    className="text-center text-[#1C4C58] bg-white p-2 rounded-[2rem] flex justify-center items-center border-[2px] border-[solid] border-[#1C4C58] hover:bg-[#1C4C58] hover:text-white transition-all ease-linear duration-150 w-full"
                  >
                    Save Changes
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
