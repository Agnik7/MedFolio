const {firebaseConfig} = require('../firebase/firebase.config');
const bcrypt = require("bcryptjs");
const {list} = require('../models/listTest.model');

const listTest=async(req,res)=>
{
    console.log("Here")
    const {outputArray}=await list();
    console.log(outputArray);
    return res.status(200).json({success:true, outputArray})
}


module.exports = {listTest};