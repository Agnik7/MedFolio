const express=require('express')
const router=express.Router()
const {showDoctors} = require('../controllers/viewdoctors.controller');
//console.log(showDoctors);

router.get('/view',showDoctors);

module.exports=router;