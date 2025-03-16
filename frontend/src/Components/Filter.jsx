import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Filter(props) {
  const [city, setCity] = useState([]);
  const [speciality, setSpeciality] = useState([]);
  const [checkCity, setCheckCity] = useState(false);
  const [special, setSpecial] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const Place = (e) => {
    props.setLocation(e.target.value);
  };
  const Change = (e) => {
    props.setSpecial(e.target.value);
  };

  const getData = async () => {
    setCheckCity(true);
    setSpecial(true);
    try {
      const response = await axios.get(`${baseUrl}/locationRoute/list`);
      setCheckCity(false);
      setCity(response.data.outputArray);
      const res = await axios.get(`${baseUrl}/specialityRoute/list`);
      setSpecial(false);
      setSpeciality(res.data.outputArray);
    } catch (error) {
      console.log("err");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <span className="box shadow-lg shadow-[gray] bg-white w-[90%] md:w-[60%] rounded-[5rem] flex flex-row justify-center items-center gap-10 px-4">
      <div className="w-[98%] flex flex-row justify-between md:justify-center md:gap-[2rem] items-center">
        <div className="p-2 rounded-md  outline-none flex flex-row justify-start items-start">
          <label for="cities" className="text-[1rem]">City:</label>
          <select
            id="cities"
            name="cities"
            className="w-full outline-none text-[1rem]"
            value={props.location}
            onChange={Place}
          >
            {checkCity == true ? (
              <option value="loading">Loading...</option>
            ) : (
              city.map((e) => {
                return <option value={e}>{e}</option>;
              })
            )}
          </select>
        </div>
        <div className="p-2 rounded-md  outline-none flex flex-row justify-start items-start">
        <label for="cities" className="text-[1rem]">Specialty:</label>
          <select
            id="specialty"
            name="specialty"
            className="w-full text-[1rem] outline-none "
            value={props.special}
            onChange={Change}
          >
            {special==true?(<option value="Load">Loading..</option>):(
              speciality.map((e) => {
                return <option value={e}>{e}</option>;
              })
            )}
            
          </select>
        </div>
      </div>
    </span>
  );
}
