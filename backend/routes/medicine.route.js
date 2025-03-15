const express=require('express')
const router=express.Router()
const {groupMedicine} = require('../controllers/medicine.controller');
//console.log(showDoctors);

router.get('/group',groupMedicine);

module.exports=router;