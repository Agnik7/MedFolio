const express=require('express')
const {user,register,login, reset, bookAppointment,edit, notifications, ratings} = require('../controllers/user.controller');
const router=express.Router()
router.get("/",(req,res)=>{
    res.send("User route is displaying data")
})
router.get("/add",user);
router.post("/register",register);
router.post("/login",login);
router.post("/reset",reset);
router.post("/book",bookAppointment);
router.post("/edit",edit);
router.post("/notifications",notifications);
router.post("/rating",ratings);
module.exports=router;