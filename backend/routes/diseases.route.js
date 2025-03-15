const express=require('express')
const router=express.Router()
const {diseaseDetails} = require('../controllers/diseases.controller');
/*const {user,register,login} = require('../controllers/user.controller');
router.get("/",(req,res)=>{
    res.send("User route is displaying data")
})
router.get("/add",user);
router.post("/register",register);
router.post("/login",login);*/
router.get('/details',diseaseDetails)

module.exports=router;