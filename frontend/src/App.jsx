import React,{ useState,useEffect } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import AppointmentPage from "./pages/AppointmentPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Medical from "./pages/Medical";
import DiseaseChecker from "./pages/DiseaseChecker";
import Dashboard from "./pages/Dashboard";
import Medicine from "./pages/Medicine";
import Doctors from "./pages/Doctors";


import SideNav from "./Components/SideNav";
import TopBar from "./Components/TopBar";

function App() {
  const [user, setUser] = useState({
    email: "",
    profilePic: "",
    isLoggedIn: false,
    fullName: "",
    userName: "",
    type: "",
    specialization: "",
    appointments: [],
    rating: 0,
    city: "",
    token: ""
  });

  useEffect(()=>{
    if(user.isLoggedIn === true)
      localStorage.setItem('userData', JSON.stringify(user));
    console.log(user)
  },[user.isLoggedIn]);
  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('userData'));

    if(userData)
    {
      setUser({...userData})
    }
    else
    {
      setUser({
        email: "",
        profilePic: "",
        isLoggedIn: false,
        fullName: "",
        userName: "",
        type: "",
        specialization: "",
        appointments: [],
        rating: 0,
        city: "",
        token: ""
      })
    }
  },[]);
  return (    
      <section className=" min-h-screen  m-0">
      
        
      {user.isLoggedIn && <TopBar user={user} 
                    setUser={setUser} />}
      <div className={`${user.isLoggedIn? "flex justify-between items-center h-[calc(100vh-6rem)] w-full":""} `}>
       {user.isLoggedIn && <SideNav/>}
        <Router>
          <Routes>
          {user.isLoggedIn ? (
              <>
                <Route path="/" index element={<Navigate to={`/${user.userName}/dashboard`} />} />
                <Route path="/:username/dashboard" element={
                  <Dashboard 
                    user={user} 
                    setUser={setUser} 
                  />} />
                <Route path="/disease" element={
                  <DiseaseChecker 
                    user={user} 
                    setUser={setUser} 
                  />} />
                <Route path="/test" element={
                  <Medical 
                    user={user} 
                    setUser={setUser} 
                  />} />
                <Route path="/doctors" element={
                  <Doctors 
                    user={user} 
                    setUser={setUser} 
                  />} />
                <Route path="/medicine" element={
                  <Medicine 
                    user={user} 
                    setUser={setUser} 
                  />} />
                <Route path="/appointment" element={
                  <AppointmentPage 
                    user={user} 
                    setUser={setUser} 
                  />} />
              </>
            ) : (
              <>
                <Route path="/" index element={
                  <LandingPage 
                    user={user} 
                    setUser={setUser} 
                  />} /> 
                  <Route path="/:username/dashboard" index element={<Navigate to={'/'} />} />
                  <Route path="/disease"  element={<Navigate to={'/'} />} />
                  <Route path="/test"  element={<Navigate to={'/'} />} />
                  <Route path="/doctors"  element={<Navigate to={'/'} />} />
                  <Route path="/medicine"  element={<Navigate to={'/'} />} />
                  <Route path="/appointment"  element={<Navigate to={'/'} />} />
              </>
            )}
          
          </Routes>
        </Router>
        </div>
      </section>
  );
}

export default App;
