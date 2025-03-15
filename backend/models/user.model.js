const { MongoClient, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const MONGO_URL = process.env.MONGO_URL;
const MedDB=new MongoClient(MONGO_URL);
// Register method contains both register for patient and register for doctor.
const registerUser = async({username, email, hashedPassword, userType, profilePic, specialization, city, fees, experience})=>{
    let existing = false;
    try {
        await MedDB.connect();
        const DATABASE = MedDB.db('MedfolioDB');
        let USERCOLLECTION;
        let user;
        if(userType === 'patient')
        {
            user = {
                name:username,
                email:email,
                password: hashedPassword,
                type:userType,
                profilePic: profilePic,
                appointments: [],
                search_history:[],
                tests:[]
            };
            USERCOLLECTION = DATABASE.collection('User');

        }
        else
        {
            user = {
                name:username,
                email:email,
                password: hashedPassword,
                type:userType,
                profilePic: profilePic,
                specialization: specialization,
                fees: fees,
                experience: experience,
                appointments: [],
                rating: 0,
                city:city
            };
            USERCOLLECTION = DATABASE.collection('Doctors')
        }
        const existingUser = await USERCOLLECTION.findOne({ email: email });
        if (existingUser) {
            existing = true;
            throw new Error("User exists in database");
          }
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
        return {token: null, error: error, status: existing?400:500};
    }
    finally {
        await MedDB.close();
    }
}
// Login method contains both login for patient and login for doctor.
const loginUser = async(email, password, userType)=>{
    let existing = true;
    try {
        await MedDB.connect();
        const DATABASE = MedDB.db('MedfolioDB');
        let USERCOLLECTION;
        if(userType === 'patient')
            USERCOLLECTION = DATABASE.collection('User');
        else
            USERCOLLECTION = DATABASE.collection('Doctors')
        console.log("email = ", email)
        const existingUser = await USERCOLLECTION.findOne({ email: email });
        if (!existingUser) {
            existing = false;            
            throw new Error("User is not present in the database, please login.");
        }
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            throw new Error("The password is incorrect. Please try again.");
          }
        if (existingUser && passwordMatch) {
            const token = jwt.sign(
                { id: existingUser._id },
                process.env.JWT_SECRET,
            );
            existingUser.token = token;
            delete existingUser.password;
            return {user:existingUser, error: null, status:200};
        }
    }
    catch(error){
        return {token: null, error: error, status: existing?400:500};
    }
    finally {
        await MedDB.close();
    }
}

const resetPassword = async ({ email, hashedPassword }) => {
    try {
      await MedDB.connect();
      const DATABASE = MedDB.db('MedfolioDB');
      
      let userCollection = DATABASE.collection('User');
      let doctorCollection = DATABASE.collection('Doctors');
      
      // Search in User collection
      let user = await userCollection.findOne({ email });
      if (user) {
        await userCollection.updateOne({ email }, { $set: { password: hashedPassword } });
        return { error: null, status: 200 };
      }
  
      // Search in Doctors collection
      let doctor = await doctorCollection.findOne({ email });
      if (doctor) {
        await doctorCollection.updateOne({ email }, { $set: { password: hashedPassword } });
        return { error: null, status: 200 };
      }
  
      // User not found in both collections
      throw new Error('User not found');
      
    } catch (error) {
      return { error: error.message, status: 404 };
    } finally {
      await MedDB.close();
    }
  };
  


module.exports = {registerUser,loginUser, resetPassword};