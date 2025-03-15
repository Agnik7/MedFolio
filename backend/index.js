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
const PORT=8080;
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
/* app.get('/fee',async(req,res)=>
{
	const { test,name } = req.query;
	try {
		await MedDB.connect();
		const DATABASE = MedDB.db("MedfolioDB");
		const USERCOLLECTION = DATABASE.collection("Tests");
		let fees = [];
		fee=0;
		(await USERCOLLECTION.find({ name:name }).toArray()).forEach((l) => {
		  //console.log(l.tests);
		 
			l.tests.forEach((e) => {
			  if (e.test_name == test) {
				console.log(e.fee);
				fees.push(e.fee);
				console.log(fees);
				res.json(e.fee);
				
			  }
			});
		  
	
		  
		});
		console.log("hii");
	   
	
		
	  } catch (error) {
		console.log("error");
	  }

})*/
app.use("/payment",paymentRoute);
app.use("/prescriptions",prescriptionRoute);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: [ "GET", "POST" ]
  }
});
/* io.on('connection', (socket) => {
	console.log('a user connected');
  
	socket.on('join', (userEmail) => {
	  socket.join(userEmail);
	});
  
	socket.on('disconnect', () => {
	  console.log('user disconnected');
	});
  }); */
server.listen(PORT,()=>{
    console.log("Server is running on port 8080")
})
module.exports = { io };