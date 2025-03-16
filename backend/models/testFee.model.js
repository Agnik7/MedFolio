const { MongoClient, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const MONGO_URL = process.env.MONGO_URL;
const MedDB = new MongoClient(MONGO_URL);

const list = async ({  test, name,city }) => {
  try {
    await MedDB.connect();
    const DATABASE = MedDB.db("MedfolioDB");
    const USERCOLLECTION = DATABASE.collection("Tests");
    let fees = [];
    fee=0;
    (await USERCOLLECTION.find({ city:city }).toArray()).forEach((l) => {
      if(l.name==name)
      {
        l.tests.forEach((e) => {
            if (e.test_name == test) {
              fees.push(e.fee);
            }
          });
      }
     
        
      

      
    });
    return {fees};
   

    
  } catch (error) {
    console.log("error");
  }
};

module.exports = { list };
