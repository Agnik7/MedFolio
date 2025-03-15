const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const jwtDecode = require("jwt-decode");
const userRoute=require('./routes/user.route')
const app=express();
const PORT=8080
const corsOpts = {
    origin: "*",
  
    methods: ["GET", "POST", "PUT", "DELETE"],
  
    allowedHeaders: ["Content-Type"],
  };
  app.use(express.json());
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  
  // parse application/json
  app.use(bodyParser.json());
  app.use(cors(corsOpts));
  app.use(cookieParser());
app.use("/user",userRoute);
app.listen(PORT,()=>{
    console.log("Server is running")
})