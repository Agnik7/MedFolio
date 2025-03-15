const express=require('express')
const router=express.Router()
const {groupDoctors} = require('../controllers/groupdoctors.controller');
//console.log(showDoctors);

router.get('/group',groupDoctors);

module.exports=router;