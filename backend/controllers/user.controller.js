const {firebaseConfig} = require('../firebase/firebase.config');
const bcrypt = require("bcryptjs");
const {registerUser,loginUser,resetPassword} = require('../models/user.model');
const user = async(req, res)=>{
    return res.status(200).json({message: "this works", config:firebaseConfig})
}
const register = async(req, res)=>{
    const {name, email, password, userType, city, specialization, fees, experience} = req.body;
    console.log("Registering")
    if (!(name && email && password && userType))
        return res.status(400).send("All fields must be filled");
    const hashedPassword = await bcrypt.hash(password, 10);
    const placeholder_avatar = process.env.PLACEHOLDER_IMAGE;
    const {user, error,status} = await registerUser({username:name, email, hashedPassword,userType, profilePic:placeholder_avatar, specialization, city, fees, experience})
    if(error === null)
        return res.status(status).json({success:true, message: "User Registered Successfully", user:user})
    else
        return res.status(status).json({success:false,error:error, message: (status === 400)?"User Already Exists in the Database": "Internal Server Error Occurred"})
}

const login = async(req, res)=>{
    const {email, password, userType} = req.body;
    console.log(email)
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

module.exports={user, register,login, reset};
