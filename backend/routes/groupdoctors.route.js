const express=require('express')
const router=express.Router()
const {groupDoctors} = require('../controllers/groupdoctors.controller');
router.get('/group',groupDoctors);

module.exports=router;