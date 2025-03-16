import React, { useEffect, useState } from "react";
import Doctorslist from "../Components/Doctorslist";
import Filter from "../Components/Filter";

export default function Doctors({count,setCount,user,setUser}) {
  
  const [location,setLocation]=useState("Cities incoming....");
  const [special,setSpecial]=useState("Specialities incoming");

  useEffect(() => {
    setCount(0);   
  }, []);
  
  return (<section className="w-full pt-7 h-full flex flex-col justify-center items-center gap-6">
    <Filter location={location} setLocation={setLocation} special={special} setSpecial={setSpecial}/>
    <Doctorslist user={user} setUser={setUser} location={location} setLocation={setLocation} special={special} setSpecial={setSpecial}/>

  </section>);
}
