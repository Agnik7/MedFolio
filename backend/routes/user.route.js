const express=require('express')
const {user,register} = require('../controllers/user.controller');
const router=express.Router()
router.get("/",(req,res)=>{
    res.send("User route is displaying data")
})
router.get("/add",user);
router.post("/register",register);
module.exports=router;