const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const jwtDecode = require("jwt-decode");

const userRoute=require('./routes/user.route')
const diseaseRoute=require('./routes/diseases.route');
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
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: [ "GET", "POST" ]
  }
});
io.on("connection", (socket) => {
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});
app.listen(PORT,()=>{
    console.log("Server is running on port 8080")
})