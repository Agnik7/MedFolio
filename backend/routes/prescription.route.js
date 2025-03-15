const express=require('express')
const {getPrescription, postPrescription, modifyPrescription} = require('../controllers/prescription.controller');
const router=express.Router()
router.get("/",(req,res)=>{
    res.send("Prescription route is displaying data")
})
router.get('/get',getPrescription)
router.post("/post",postPrescription)
router.post("/update",modifyPrescription)
  
module.exports=router;