const {fetchPrescription, addPrescription,updatePrescription}  = require('../models/prescription.model');
const getPrescription = async(req,res)=>{
    const {userEmail, doctorEmail} = req.query;
    const {data} = await fetchPrescription({userEmail, doctorEmail});
    res.status(200).json({success:true, prescription:data});
}
const postPrescription = async(req,res)=>{
    const {userEmail,doctorEmail, details} = req.body;
    const flag = await addPrescription({userEmail, doctorEmail, details});
    if(flag)
        res.status(200).json({success:true, message:"Prescription posted successfully"});
    else
        res.status(500).json({success:false, message:"Error occurred"});
}
const modifyPrescription = async(req,res)=>{
    const {userEmail,doctorEmail, details} = req.body;
    const flag = await updatePrescription({userEmail, doctorEmail, details});
    if(flag)
        res.status(200).json({success:true, message:"Prescription posted successfully"});
    else
        res.status(500).json({success:false, message:"Error occurred"});
}
module.exports = {getPrescription,postPrescription,modifyPrescription};