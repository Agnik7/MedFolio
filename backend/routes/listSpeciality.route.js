const express=require('express')
const router=express.Router()
const {listSpeciality} = require('../controllers/listSpeciality.controller');
//console.log(showDoctors);

router.get('/list',listSpeciality);

module.exports=router;