const {firebaseConfig} = require('../firebase/firebase.config');
const bcrypt = require("bcryptjs");
const {registerUser} = require('../models/user.model');
const user = async(req, res)=>{
    return res.status(200).json({message: "this works", config:firebaseConfig})
}
const register = async(req, res)=>{
    const {name, email, password, userType} = req.body;
    console.log(req.body)
    if (!(name && email && password && userType))
        return res.status(400).send("All fields must be filled");
    const hashedPassword = await bcrypt.hash(password, 10);
    const placeholder_avatar = process.env.PLACEHOLDER_IMAGE;
    const {user, error,status} = await registerUser({username:name, email, hashedPassword,userType, profilePic:placeholder_avatar});
    if(error === null)
        return res.status(status).json({success:true, message: "User Registered Successfully", user:user})
    else
        return res.status(status).json({success:false,error:error, message: (status === 400)?"User Already Exists in the Database": "Internal Server Error Occurred"})
}
module.exports={user, register};
