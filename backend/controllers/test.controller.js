const {firebaseConfig} = require('../firebase/firebase.config');
const bcrypt = require("bcryptjs");
const {list} = require('../models/test.model');

const lists=async(req,res)=>
{
    const {outputArray}=await list();
    return res.status(200).json({success:true, outputArray})
}


module.exports = {lists};