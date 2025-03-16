const {firebaseConfig} = require('../firebase/firebase.config');
const bcrypt = require("bcryptjs");
const {registerUser,loginUser,resetPassword, bookMedicalAppointment, editUser, fetchDoctor,fetchDoctorByName, postNotification, fetchNotification, postRating} = require('../models/user.model');

const user = async(req, res)=>{
    return res.status(200).json({message: "this works", config:firebaseConfig})
}
const register = async(req, res)=>{
    const {name, email, password, userType, city, specialization, fees, experience, gender, age, bloodGroup, mobile} = req.body;
    if (!(name && email && password && userType))
        return res.status(400).send("All fields must be filled");
    const hashedPassword = await bcrypt.hash(password, 10);
    const placeholder_avatar = process.env.PLACEHOLDER_IMAGE;
    const {user, error,status} = await registerUser({username:name, email, hashedPassword,userType, profilePic:placeholder_avatar, specialization, city, fees, experience, gender, age, bloodGroup,mobile})
    if(error === null)
        return res.status(status).json({success:true, message: "User Registered Successfully", user:user})
    else
        return res.status(status).json({success:false,error:error, message: (status === 400)?"User Already Exists in the Database": "Internal Server Error Occurred"})
}

const login = async(req, res)=>{
    const {email, password, userType} = req.body;
    if (!(email && password && userType))
        return res.status(401).json({success:false, message: "Please enter all fields"});
    const {user, error,status} = await loginUser(email,password,userType);
    if(error === null)
        return res.status(status).json({success:true, message: "User Logged in Successfully", user:user})
    else
        return res.status(status).json({success:false,error:error.message, message:error.message})
}

const reset = async(req, res)=>{
    const {email, password} = req.body;
    if (!(email && password))
        return res.status(400).send("All fields must be filled");
    const hashedPassword = await bcrypt.hash(password, 10);
    const {error,status} = await resetPassword({email, hashedPassword})
    if(error === null)
        return res.status(status).json({success:true, message: "Password Reset Successfully"})
    else
        return res.status(status).json({success:false,error:error, message: (status === 400)?"User Already Exists in the Database": "Internal Server Error Occurred"})
}
const bookAppointment = async(req,res)=>{
    const {doctorEmail, userEmail, date, time,disease} = req.body;
    const {status, error, user} = await bookMedicalAppointment({doctorEmail, userEmail, date, time, disease});
    
    if(error === null){
        const {doctor} = await fetchDoctor({ email: doctorEmail });
        const {notification} = await postNotification({doctor, user, date, time});
        return res.status(status).json({success:true, message: "Appointment Booked Successfully", updatedUser:user})
    }
    else
        return res.status(status).json({success:false,error:error, message: "Internal Server Error Occurred"})
}

const edit = async(req, res)=>{
    const {name, email, password, userType, city, profilePic, specialization, fees, experience, gender, age, bloodGroup, mobile} = req.body;
    const {user, error,status} = await editUser({username:name, email, userType, profilePic:profilePic, specialization, city, fees, experience, gender, age, bloodGroup,mobile})
    if(error === null)
        return res.status(status).json({success:true, message: "User Edited Successfully", user:user})
    else
        return res.status(status).json({success:false,error:error, message: "Internal Server Error Occurred"})
}
const notifications = async(req,res)=>{
    const {user} = req.body;
    const notification = await fetchNotification({email:user.email, userType:user.type})
    if(notification !== undefined)
        return res.status(200).json({success:true, message:"Notifications received", notifications:notification})
    else
        return res.status(200).json({success:true, message:"Notifications received", notifications:[]})
}
const ratings= async(req,res)=>{
    const {doctorName, userRating} = req.body;
    const {doctor} = await fetchDoctorByName({ name: doctorName });
    const patientsLength = doctor.appointments.length;
    const result = await postRating({doctor,userRating,patientsLength});
    if(result)
        return res.status(200).json({success:true, message:"Rating sent"})
    else
        return res.status(500).json({success:false, message:"Rating couldn't be posted"})
}
module.exports={user, register,login, reset, bookAppointment, edit, notifications, ratings};
