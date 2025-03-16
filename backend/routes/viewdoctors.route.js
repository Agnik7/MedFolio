const express=require('express')
const router=express.Router()
const {showDoctors} = require('../controllers/viewdoctors.controller');
router.get('/view',showDoctors);

module.exports=router;