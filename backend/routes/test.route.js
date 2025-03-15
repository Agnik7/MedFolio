const express=require('express')
const router=express.Router()
const {lists} = require('../controllers/test.controller');
//console.log(showDoctors);

router.get('/list',lists);

module.exports=router;