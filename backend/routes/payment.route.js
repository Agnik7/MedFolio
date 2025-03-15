const express=require('express')
const {paymentOrder,paymentValidate} = require('../controllers/payment.controller');
const router=express.Router()
router.get("/",(req,res)=>{
    res.send("User route is displaying data")
})
router.post('/order',paymentOrder)
router.post("/order/validate",paymentValidate)
  
module.exports=router;