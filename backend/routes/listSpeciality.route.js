const express=require('express')
const router=express.Router()
const {listSpeciality} = require('../controllers/listSpeciality.controller');

router.get('/list',listSpeciality);

module.exports=router;