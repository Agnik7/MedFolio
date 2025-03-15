const express=require('express')
const router=express.Router()
const {listTest} = require('../controllers/listTest.controller');
//console.log(showDoctors);

router.get('/list',listTest);

module.exports=router;