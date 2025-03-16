const { MongoClient, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const MONGO_URL = process.env.MONGO_URL;
const MedDB=new MongoClient(MONGO_URL);
const {generateRoomId} = require('../utilities/utils');
// Register method contains both register for patient and register for doctor.
const registerUser = async({username, email, hashedPassword, userType, profilePic, specialization, city, fees, experience, gender, age, bloodGroup, mobile})=>{
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
                tests:[],
                gender:gender,
                age:age,
                bloodGroup:bloodGroup,
                mobile:mobile
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
                city:city,
                gender:gender,
                age:age,
                bloodGroup:bloodGroup
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
        console.log("Error")
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

const bookMedicalAppointment = async({doctorEmail, userEmail, date, time, disease})=>{
    try {
        await MedDB.connect();
        const DATABASE = MedDB.db('MedfolioDB');
        let userCollection = DATABASE.collection('User');
        let doctorCollection = DATABASE.collection('Doctors');
        // Find the user and doctor
        const user = await userCollection.findOne({ email: userEmail });
        const doctor = await doctorCollection.findOne({ email: doctorEmail });
        if (!user || !doctor) {
            throw new Error('User or Doctor not found');
        }
        const roomId = await generateRoomId(5);
        const userAppointment = {
            doctorName: doctor.name,
            doctorEmail: doctor.email,
            doctorPic:doctor.profilePic,
            doctorSpecialization: doctor.specialization,
            doctorFees:doctor.fees,
            doctorExperience:doctor.experience, 
            doctorRating:doctor.rating,
            doctorCity:doctor.city,
            disease:disease,
            date,
            time,
            linkID: roomId
        };

        const doctorAppointment = {
            userId: user._id,
            userName: user.name,
            userEmail: user.email,
            userPic:user.profilePic,
            disease:disease,
            date,
            time,
            linkID: roomId
        };

        const updatedUser = await userCollection.findOneAndUpdate(
            { email: userEmail },
            { $push: { appointments: { $each: [userAppointment], $position: 0 } } },
            { returnDocument: 'after' }
        );
        delete updatedUser.password;
        // Update doctor's appointments
        const upd = await doctorCollection.findOneAndUpdate(
            { email: doctorEmail },
            { $push: { appointments: { $each: [doctorAppointment], $position: 0 } } }
        );
        return { status: 200, error:null, user:updatedUser };

      } catch (error) {
        return { error: error.message, status: 404 };
      } finally {
        await MedDB.close();
      }
}
const editUser = async({username, email, userType, profilePic, specialization, city, fees, experience, gender, age, bloodGroup, mobile})=>{
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
                type:userType,
                profilePic: profilePic,
                gender:gender,
                age:age,
                bloodGroup:bloodGroup,
                mobile:mobile
            };
            USERCOLLECTION = DATABASE.collection('User');

        }
        else
        {
            user = {
                name:username,
                email:email,
                type:userType,
                profilePic: profilePic,
                specialization: specialization,
                fees: fees,
                experience: experience,
                city:city
            };
            USERCOLLECTION = DATABASE.collection('Doctors')
        }
        const editedUser = await USERCOLLECTION.findOneAndUpdate({ email: email },{$set:user},{ returnDocument: 'after' });
          delete editedUser.password;
          return {user:user, error: null, status:200};
    }
    catch(error){
        return {token: null, error: error, status:500};
    }
    finally {
        await MedDB.close();
    }
}

const fetchDoctor=async({email})=>{
    let existing = false;

    try {
        await MedDB.connect();
        const DATABASE = MedDB.db('MedfolioDB');
        
        let USERCOLLECTION = DATABASE.collection('Doctors');
        const doctor = await USERCOLLECTION.findOne({email:email})
        
        return {doctor:doctor};
    }
    catch(error){
        return {token: null, error: error, status:500};
    }
    finally {
        await MedDB.close();
    }
}
const fetchDoctorByName=async({name})=>{
    let existing = false;

    try {
        await MedDB.connect();
        const DATABASE = MedDB.db('MedfolioDB');        
        let USERCOLLECTION = DATABASE.collection('Doctors');
        const doctor = await USERCOLLECTION.findOne({name:name})        
        return {doctor:doctor};
    }
    catch(error){
        return {token: null, error: error, status:500};
    }
    finally {
        await MedDB.close();
    }
}

const postNotification=async({doctor,user,userName, date, time})=>{
    let existing = false;

    try {
        await MedDB.connect();
        const DATABASE = MedDB.db('MedfolioDB');        
        let USERCOLLECTION = DATABASE.collection('Notifications');
        const notification = {
            doctorEmail: doctor.email,
            userEmail: user.email,
            message: `Appointment of ${user.name} with ${doctor.name} on ${date} at ${time}`,
            read: false,
            createdAt: new Date()
        }
        const insertNotification = await USERCOLLECTION.insertOne(notification)
        
        if(insertNotification)
            return true;
        else
            return false;
    }
    catch(error){
        return {token: null, error: error, status:500};
    }
    finally {
        await MedDB.close();
    }
}

const fetchNotification = async ({ email, userType }) => {
        await MedDB.connect();
        const DATABASE = MedDB.db('MedfolioDB');
        const USERCOLLECTION = DATABASE.collection('Notifications');
        let notifications;
        if (userType === 'patient') {
            notifications = await USERCOLLECTION.find({ userEmail: email }).toArray();
        } else {
            notifications = await USERCOLLECTION.find({ doctorEmail: email }).toArray();
        }        
        return notifications;    
};

const postRating = async({doctor,userRating, patientsLength})=>{
    try {
        await MedDB.connect();
        const DATABASE = MedDB.db('MedfolioDB');
        
        let USERCOLLECTION = DATABASE.collection('Doctors');
        const insertRating = await USERCOLLECTION.findOneAndUpdate({email:doctor.email},
        {
            $set:{
                rating: `${(Number(doctor.rating)+Number(userRating))/patientsLength}`
            }
        })
        
        if(insertRating)
            return true;
        else
            return false;
    }
    catch(error){
        return {token: null, error: error, status:500};
    }
    finally {
        await MedDB.close();
    }
}
module.exports = {registerUser,loginUser, resetPassword,bookMedicalAppointment,editUser,fetchDoctor, fetchDoctorByName,postNotification, fetchNotification, postRating};