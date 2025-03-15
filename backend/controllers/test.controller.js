const {firebaseConfig} = require('../firebase/firebase.config');
const bcrypt = require("bcryptjs");
const {list} = require('../models/test.model');

const lists=async(req,res)=>
{
    console.log("Here")
    const {outputArray}=await list();
    console.log(outputArray);
    return res.status(200).json({success:true, outputArray})
}


module.exports = {lists};