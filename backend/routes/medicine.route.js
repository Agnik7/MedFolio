const express=require('express')
const router=express.Router()
const {groupMedicine} = require('../controllers/medicine.controller');
router.get('/group',groupMedicine);

module.exports=router;