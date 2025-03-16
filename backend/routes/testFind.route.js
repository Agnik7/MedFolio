const express=require('express')
const router=express.Router()
const {groupTests} = require('../controllers/testFind.controller');
router.get('/group',groupTests);

module.exports=router;