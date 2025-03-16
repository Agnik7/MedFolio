const express=require('express')
const router=express.Router()
const {lists} = require('../controllers/test.controller');
router.get('/list',lists);

module.exports=router;