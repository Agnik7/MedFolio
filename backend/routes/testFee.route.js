const express=require('express')
const router=express.Router()
const {fee} = require('../controllers/testFee.controller');
//console.log(showDoctors);

router.get('/fee',fee);

module.exports=router;