import React, { useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "./ui/animated-modal";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import logo from "../assets/Logo.png";

export default function BookingModal({disease,user,setUser, userName, userEmail, doctorEmail, doctorName, fees, buttonText, buttonClassName }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isPaying, setIsPaying] = useState(false); // Flag to manage Razorpay instance
  const [userDisease, setUserDisease] = useState(disease? disease:"");
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const formattedDate = selectedDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).replace(/ /g, ' ');
    setDate(formattedDate);
  };

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const paymentHandler = async (e, amount, doctorEmail, userEmail, date, time, userName) => {
    console.log("payment handler")
    if (isPaying) return; // Prevent multiple instances

    setIsPaying(true); // Set the flag to true when payment process starts

    const res = await axios.post(`${baseUrl}/payment/order`, { fees: (Number(amount) * 100) });
    const options = {
      key: import.meta.env.VITE_RAZORPAY_API_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: (Number(amount) * 100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "MedFolio", // your business name
      description: "Payment for booking doctor",
      image: logo,
      order_id: res.data.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
          email: userEmail
        };

        const validateRes = await axios.post(
          `${baseUrl}/payment/order/validate`, body
        );
        if (validateRes.data.msg === 'success') {
          console.log("Payment Successful");
          // book appointment
          const appointmentBody = {
            doctorEmail: doctorEmail,
            userEmail: userEmail,
            date: date,
            time: time,
            disease:userDisease
          };
          await axios.post(`${baseUrl}/user/book`, appointmentBody)
            .then((res) => {
              console.log("Appointment booked successfully");
              console.log(res);
              let newUser = { ...user, appointments: res.data.updatedUser.appointments };
              localStorage.setItem("userData", JSON.stringify(newUser));
              console.log(newUser);
              setUser(newUser);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        setIsPaying(false); // Reset the flag when payment process ends
      },
      prefill: {
        name: userName, // your customer's name
        email: userEmail // Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "MedFolio website",
      },
      theme: {
        color: "#1C4C58",
      },
    };
    let rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert("Payment failed. Please try again");
      setIsPaying(false); // Reset the flag on failure
    });
    rzp1.open();
    e.preventDefault();
  };

  const renderContent = () => {
    return (
      <motion.div
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-100%', opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h4 className="text-lg md:text-2xl font-bold text-center mb-8">
          Book Appointment
        </h4>
        <div className="flex flex-col w-full items-center justify-center mx-auto">
          <input value={userEmail} readOnly className="mb-3 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full" />
          <input value={userDisease} placeholder='Your Disease' type='text' onChange={(e)=>{setUserDisease(e.target.value)}} className="mb-3 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full" />
          <input type="date" onChange={handleDateChange} className="mb-3 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none placeholder:text-[#1C4C58] placeholder:text-opacity-80 border-black w-full" />
          <select value={time} onChange={(e) => setTime(e.target.value)} className="mb-3 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none border-black w-full">
            <option value="">Select Time</option>
            <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
            <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
            <option value="7:00 PM - 9:00 PM">7:00 PM - 9:00 PM</option>
          </select>
          <p className="text-left mb-3 p-2 border-b-2 bg-transparent text-[#1C4C58] outline-none border-black w-full">Fees: Rs.{fees}</p>
        </div>

        <div className="flex gap-4 w-full flex-col items-center justify-center">
          <button className="px-4 py-2 w-full text-[1.1rem] text-white bg-[#1C4C58] p-2 rounded-[2rem] flex justify-center items-center border-[2px] hover:bg-white hover:text-[#1C4C58] border-[#1C4C58] transition-all ease-linear duration-150"
            onClick={(e) => { paymentHandler(e, fees, doctorEmail, userEmail, date, time, userName) }}
          >
            Book Appointment
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={"mx-0"}>
      <Modal>
        <ModalTrigger className="flex justify-center">
          <button className={buttonClassName?buttonClassName:"bg-[#1C4C58] cursor-pointer text-white py-1 px-3 w-[12rem] rounded-md"}>
            {buttonText? buttonText: `Book Now (Rs. ${fees})`}
          </button>
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
