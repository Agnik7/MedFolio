const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const http = require("http");
const jwtDecode = require("jwt-decode");
const { MongoClient, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const MONGO_URL = process.env.MONGO_URL;
const MedDB = new MongoClient(MONGO_URL);
const userRoute=require('./routes/user.route')
const diseaseRoute=require('./routes/diseases.route');
const viewDoctorsRoute=require('./routes/viewdoctors.route');
const listDoctorsRoute=require('./routes/listdoctors.route');
const listSpecialityRoute=require('./routes/listSpeciality.route');
const groupDoctorsRoute=require('./routes/groupdoctors.route');
const listTestRoute=require('./routes/listTest.route');
const testRoute=require('./routes/test.route');
const groupTestRoute=require('./routes/testFind.route');
const feeRoute=require('./routes/testFee.route');
const paymentRoute=require('./routes/payment.route')
const prescriptionRoute = require('./routes/prescription.route')
const medicineRoute=require('./routes/medicine.route');
const { initSocket } = require("./sockets/socket.config");
const app=express();
const server = require("http").createServer(app);
const PORT=process.env.PORT || 8080;
const corsOpts = {
	origin: "*",  // Change this to your frontend URL for security
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true, // ✅ Allow credentials (cookies, tokens, etc.)
  };
app.use(express.json()); 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors(corsOpts));
app.use(cookieParser());
app.use("/user",userRoute);
app.use("/disease",diseaseRoute);
app.use("/doctorsRoute",viewDoctorsRoute);
app.use("/locationRoute",listDoctorsRoute);
app.use("/groupRoute",groupDoctorsRoute);
app.use("/specialityRoute",listSpecialityRoute);
app.use("/testRoute",listTestRoute);
app.use("/test",testRoute);
app.use("/testGroup",groupTestRoute);
app.use("/feeRoute",feeRoute);
app.use("/medicine",medicineRoute);
app.use("/payment",paymentRoute);
app.use("/prescriptions",prescriptionRoute);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: [ "GET", "POST" ]
  }
});
server.listen(PORT,()=>{
    console.log("Server is running on port 8080")
})