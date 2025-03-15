const { MongoClient, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const MONGO_URL = process.env.MONGO_URL;
const MedDB=new MongoClient(MONGO_URL);
const registerUser = async({username, email, hashedPassword, userType, profilePic})=>{
    let existing = false;
    try {
        await MedDB.connect();
        console.log("Profile = ", profilePic)
        console.log(username)
        const DATABASE = MedDB.db('MedfolioDB');
        const USERCOLLECTION = DATABASE.collection('User');
        const existingUser = await USERCOLLECTION.findOne({ email: email });
        if (existingUser) {
            existing = true;
            throw new Error("User exists in database");
          }
        let user = {
            name:username,
            email:email,
            password: hashedPassword,
            type:userType,
            profilePic: profilePic,
            appointments: [],
            search_history:[],
            tests:[]
        };
        const insertUser = await USERCOLLECTION.insertOne(user);
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET
          );
          //user._id=user._id;
          user.email = email;
          user.name = username;
          user.token = token;
          delete user.password;
          return {user:user, error: null, status:200};
    }
    catch(error){
        console.log(error);
        return {token: null, error: error, status: existing?400:500};
    }
    finally {
        await MedDB.close();
    }
}
module.exports = {registerUser};