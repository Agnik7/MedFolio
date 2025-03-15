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
    //console.log(props.location);
  };
  const Change = (e) => {
    props.setSpecial(e.target.value);
    //console.log(props.location);
  };

  const getData = async () => {
    setCheckCity(true);
    setSpecial(true);
    try {
      const response = await axios.get(`${baseUrl}/locationRoute/list`);
      setCheckCity(false);
      setCity(response.data.outputArray);
      //console.log(response.data.doctors);
      const res = await axios.get(`${baseUrl}/specialityRoute/list`);
      setSpecial(false);
      setSpeciality(res.data.outputArray);
    } catch (error) {
      console.log("err");
    }
  };
  useEffect(() => {
    //console.log(props.location);

    getData();
  }, []);
  return (
    <span className="box shadow-lg shadow-[gray] bg-white w-[90%] md:w-[50%] h-[5rem] rounded-[5rem] flex flex-row justify-center items-center gap-10 p-4">
      <div className="w-[98%] md:w-[60%] flex flex-row justify-between items-center">
        <div className="w-[7rem]   p-2 rounded-md  outline-none flex flex-col justify-start items-start">
          <label for="cities">Choose a city:</label>
          <select
            id="cities"
            name="cities"
            className="w-full outline-none"
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
        <div className="w-[10rem]  p-2 rounded-md  outline-none flex flex-col justify-start items-start">
          <label for="specialty">Choose a specialty:</label>
          <select
            id="specialty"
            name="specialty"
            className="w-full outline-none "
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
