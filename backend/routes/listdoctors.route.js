const express=require('express')
const router=express.Router()
const {listDoctors} = require('../controllers/listdoctors.controller');
//console.log(showDoctors);

router.get('/list',listDoctors);

module.exports=router;