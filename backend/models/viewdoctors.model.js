const { MongoClient, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const MONGO_URL = process.env.MONGO_URL;
const MedDB=new MongoClient(MONGO_URL);

const show=async()=>
{
    try {
        await MedDB.connect();
        const DATABASE = MedDB.db('MedfolioDB');
        const USERCOLLECTION = DATABASE.collection('Doctors');
        const doctors=await USERCOLLECTION.find({}).toArray();
        console.log(doctors);
        return {doctors:doctors}
    } catch (error) {
        console.log("err");
        
    }

}

module.exports = {show};

