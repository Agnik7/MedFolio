const {firebaseConfig} = require('../firebase/firebase.config');
const bcrypt = require("bcryptjs");
const {list} = require('../models/listSpeciality.model');

const listSpeciality=async(req,res)=>
{
    
    const {outputArray}=await list();
    return res.status(200).json({success:true, outputArray})
}


module.exports = {listSpeciality};