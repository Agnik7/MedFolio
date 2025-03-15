const {firebaseConfig} = require('../firebase/firebase.config');
const bcrypt = require("bcryptjs");
const {show} = require('../models/viewdoctors.model');

const showDoctors=async(req,res)=>
{
    console.log("Here")
    const {doctors}=await show();
    console.log(doctors);
    return res.status(200).json({success:true, doctors:doctors})
}


module.exports = {showDoctors};