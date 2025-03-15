const { MongoClient, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const MONGO_URL = process.env.MONGO_URL;
const MedDB = new MongoClient(MONGO_URL);

const medi = async ({medicine}) => {
  try {
    await MedDB.connect();
    const DATABASE = MedDB.db("MedfolioDB");
    const USERCOLLECTION = DATABASE.collection("Medicine");
    //console.log("jii");
    let list = [];
    (await USERCOLLECTION.find({medicine_name:medicine}).toArray()).forEach((l) => {
        //console.log(l.tests);
      l.pharmacies.forEach((e)=>
    {
        list.push(e);
    })
    });
    
    console.log(list);
    return { list };
  } catch (error) {
    console.log("err");
  }
};



module.exports = { medi };
