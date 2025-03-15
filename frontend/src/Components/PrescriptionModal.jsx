import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "./ui/animated-modal";
import { motion } from "framer-motion";
import axios from "axios";
export default function PrescriptionModal({ doctor, user }) {
  const [prescription, setPrescription] = useState("");
  const [prescriptionExists, setPrescriptionExists] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const handleSave = async () => {
    const endpoint = prescriptionExists ? 'update' : 'post';
    await axios.post(`${baseUrl}/prescriptions/${endpoint}`, {
      userEmail: doctor.userEmail,
      doctorEmail: user.email,
      details: prescription
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
  };
  const fetchPrescription = async () => {
    await axios.get(`${baseUrl}/prescriptions/get?userEmail=${user.type === 'patient' ? user.email : doctor.userEmail}&doctorEmail=${user.type === 'patient' ? doctor.doctorEmail : user.email}`)
    .then((res) => {
      console.log(res);
      if (res.data.prescription.length > 0) {
        setPrescription(res.data.prescription[0].details);
        setPrescriptionExists(true);
      } else {
        setPrescriptionExists(false);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  };
  /* useEffect(() => {
    if (user.type === "patient") {
      // Fetch the prescription for the patient if necessary
      setPrescription("Existing prescription content for patient"); // Placeholder for actual prescription fetching logic
    }
  }, [user.type]); */

  return (
    <Modal>
      <ModalTrigger className="bg-[#1C4C58] rounded-3xl text-white p-2 hover:bg-[#143740] w-full">
        <button onClick={fetchPrescription}>
          Prescription
        </button>
      </ModalTrigger>
      <ModalBody className="mx-4 bg-[#BAC9D5] rounded-lg">
        <ModalContent className="w-full overflow-x-hidden overflow-y-auto">
          <div>
            <h4 className="text-lg text-[#1C4C58] md:text-2xl font-bold text-center mb-4">
              Prescription for {user.type === 'patient'?user.fullName:doctor.userName}
            </h4>
            <textarea
              value={prescription}
              onChange={(e) => user.type === "doctor" && setPrescription(e.target.value)}
              placeholder="Your Prescription will be displayed here..."
              className="w-full h-[10rem] p-2 border rounded-md"
              readOnly={user.userType === "patient"}
            />
            <p className="text-right mb-4">By {user.type === 'patient'?doctor.doctorName:user.fullName}</p>
            {user.type === "doctor" && (
              <motion.button
                onClick={handleSave}
                whileTap={{ scale: 0.95 }}
                className="text-center text-[#1C4C58] bg-white p-2 rounded-[2rem] flex justify-center items-center border-[2px] border-[solid] border-[#1C4C58] hover:bg-[#1C4C58] hover:text-white transition-all ease-linear duration-150 w-full"
              >
                Save Prescription
              </motion.button>
            )}
          </div>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
}
