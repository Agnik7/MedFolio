const {firebaseConfig} = require('../firebase/firebase.config');
const bcrypt = require("bcryptjs");
const {show} = require('../models/viewdoctors.model');

const showDoctors=async(req,res)=>
{
    const {doctors}=await show();
    return res.status(200).json({success:true, doctors:doctors})
}


module.exports = {showDoctors};