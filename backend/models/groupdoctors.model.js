const { MongoClient, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const MONGO_URL = process.env.MONGO_URL;
const MedDB=new MongoClient(MONGO_URL);

const group=async({location,speciality})=>
{
    try {
        await MedDB.connect();
        const DATABASE = MedDB.db('MedfolioDB');
        const USERCOLLECTION = DATABASE.collection('Doctors');
        console.log(speciality+" "+location);
        if(location==null)
        {
            const groupDoctors=await USERCOLLECTION.find({specialization:speciality}).toArray();
            console.log(groupDoctors);
        return {groupDoctors}

        }
        else if(speciality==null)
        {
            const groupDoctors=await USERCOLLECTION.find({city:location}).toArray();
            console.log(groupDoctors);
        return {groupDoctors}

        }
        else if(speciality!=null && location!=null)
        {
            const groupDoctors=await USERCOLLECTION.find({city:location,specialization:speciality}).toArray();
            console.log(groupDoctors);
        return {groupDoctors}

        }
        
        
    } catch (error) {
        console.log("err");
        
    }

}

module.exports = {group};

