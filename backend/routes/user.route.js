const express=require('express')
const {user,register,login, reset} = require('../controllers/user.controller');
const router=express.Router()
router.get("/",(req,res)=>{
    res.send("User route is displaying data")
})
router.get("/add",user);
router.post("/register",register);
router.post("/login",login);
router.post("/reset",reset);
module.exports=router;