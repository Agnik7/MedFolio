import React, { useState, useEffect } from "react";
import logo from "../assets/Logo.png";
import { MapPin, ImagePlus, Send, X, ChevronLeft, ChevronRight } from "lucide-react";
import { uploadImageToFirebase } from "../../firebase/firebase.init";
import { generateRoomId } from "../lib/misc";
import axios from "axios";
import BookingModal from "../Components/BookingModal";

export default function DiseaseChecker({ user, setUser, setCount }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [symptoms, setSymptoms] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [roomID, setRoomId] = useState("");
  const [userCity, setUserCity] = useState("");
  const [doctorData, setDoctorData] = useState([]);
  const [disease, setDisease] = useState("");
  const [specialist, setSpecialist] = useState("");

  useEffect(() => {
    setCount(0);
  }, []);

  const clear = () => {
    setSymptoms("");
    setImage(null);
    setImageFile(null);
  };

  const handleLocationClick = () => {
    const API = import.meta.env.VITE_GEOCODE_API;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);

        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=${API}`
          );
          const data = await response.json();
          console.log(data);
          const city =
            data.results[0].components.city || data.results[0].components.town;
          alert(city);
          setUserCity(city);
        } catch (error) {
          console.error("Error fetching city:", error);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  };

  const handleImageUpload = async (event) => {
    console.log("Image Upload");
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
      setSymptoms(""); // Clear text input when image is uploaded
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageFile(null);
  };

  const handleSend = async () => {
    setShowResults(false);
    let body;

    if (imageFile) {
      const downloadURL = await uploadImageToFirebase(imageFile);
      setImageURL(downloadURL);
      body = {
        imageURL: downloadURL,
        userEmail: user.email,
        city: userCity,
      };
    } else {
      setImageURL("");
      body = {
        textSymptom: symptoms,
        userEmail: user.email,
        city: userCity,
      };
    }

    try {
      const res = await axios.post(`${baseUrl}/disease/details`, body);
      console.log(res);
      setDisease(res.data.disease);
      setShowResults(true);
      setSpecialist(res.data.specialization);
      if (res.data.imageURL) 
        setImageURL(res.data.imageURL);

      if (res.data.doctorData && res.data.doctorData.length > 0) {
        setDoctorData(res.data.doctorData);
        setRoomId(generateRoomId(5));
      } else {
        setDoctorData([]);
      }
    } catch (error) {
      console.log(error);
    }

    console.log(body);
    clear();
  };

  const itemsPerPage = 3;
  const totalPages = Math.ceil(doctorData.length / itemsPerPage);

  const currentDoctors = doctorData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="bg-white relative h-[calc(100%-1rem)] overflow-x-hidden rounded-xl p-2 w-full mx-4">
      {showResults && (
        <div className="w-full h-3/4">
          <div className="flex flex-col items-center w-full">
            {imageURL && (
              <img src={imageURL} alt="Disease" className="w-40 object-cover" />
            )}
            <div className="flex gap-12 justify-center">
              <p className="text-[1.2rem] font-semibold">
                Disease: <span className="font-normal">{disease}</span>
              </p>
              <p className="text-[1.2rem] font-semibold">
                Specialist: <span className="font-normal">{specialist}</span>
              </p>

            </div>
          </div>
          <div className="flex justify-between mx-4">
            <p className="font-[Yaldevi] text-[1.3rem] font-semibold">
              {doctorData.length > 0 ? (
                `Showing ${specialist} in ${userCity}`
              ) : (
                `No ${specialist} found in ${userCity}`
              )}
            </p>
            {doctorData.length > 0 && (
              <div className="flex justify-end mt-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className={`mr-2 px-4 py-2 rounded-md ${
                    currentPage === 1 ? "bg-gray-200" : "bg-gray-300"
                  }`}
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === totalPages ? "bg-gray-200" : "bg-gray-300"
                  }`}
                >
                  <ChevronRight />
                </button>
              </div>
            )}
          </div>
          {doctorData.length > 0 && (
            <div className="overflow-x-auto my-4 w-full flex justify-start md:justify-center items-center ">
              <table className="min-w-full max-w-[50rem]">
                <thead>
                  <tr>
                    <th className="border-b p-2">Sl. No.</th>
                    <th className="border-b p-2">Doctor</th>
                    <th className="border-b p-2">Specialist</th>
                    <th className="border-b p-2">City</th>
                    <th className="border-b p-2">Experience (Yrs)</th>
                    <th className="border-b p-2">Rating</th>
                    <th className="border-b p-2">Booking</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDoctors.map((doctor, index) => (
                    <tr key={index}>
                      <td className="border-b p-2 text-center">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="border-b p-2">{doctor.name}</td>
                      <td className="border-b p-2">{doctor.specialization}</td>
                      <td className="border-b p-2">{doctor.city}</td>
                      <td className="border-b p-2 text-center">
                        {doctor.experience}
                      </td>
                      <td className="border-b p-2 text-center">
                        {doctor.rating}
                      </td>
                      <td className="border-b p-2 text-center">
                        <BookingModal
                          disease={disease}
                          user={user}
                          setUser={setUser}
                          userName={user.fullName}
                          userEmail={user.email}
                          doctorEmail={doctor.email}
                          fees={doctor.fees}
                          doctorName={doctor.name}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <div className="absolute w-[98%] bottom-0 left-1/2 -translate-x-1/2">
        <div className="bg-[#1B4D56] bg-opacity-40 rounded-lg my-2 flex flex-col justify-end gap-0">
          {image && (
            <div className="relative max-w-24 mx-2 mt-2">
              <img
                src={image}
                alt="Preview"
                className="max-w-20 pt-0 object-cover"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute -top-1 right-0 bg-white rounded-full p-1 shadow-lg"
              >
                <X className="w-4 h-4 text-black" />
              </button>
            </div>
          )}
          <div className="flex p-2 items-end">
            <input
              type="text"
              placeholder="Enter your symptoms"
              value={symptoms}
              onChange={(e) => {
                setSymptoms(e.target.value);
                if (e.target.value) setImage(null);
              }}
              disabled={!!image}
              className="flex-grow border-b-2 placeholder:text-white bg-transparent border-white focus:outline-none focus:border-white/80"
            />
            <div className="flex items-end space-x-2">
              <button onClick={handleLocationClick} className="py-1">
                <MapPin className="w-6" />
              </button>
              <div className="py-1">
                <label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={!!symptoms}
                  />
                  <ImagePlus
                    className={`w-6 ${
                      symptoms ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  />
                </label>
              </div>
              <button
                onClick={handleSend}
                className="bg-[#1C4C58] py-1 px-3 rounded-md"
              >
                <Send className="text-white w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

