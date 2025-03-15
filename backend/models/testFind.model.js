const { MongoClient, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const MONGO_URL = process.env.MONGO_URL;
const MedDB = new MongoClient(MONGO_URL);

const list = async ({city,test}) => {
  try {
    await MedDB.connect();
    const DATABASE = MedDB.db("MedfolioDB");
    const USERCOLLECTION = DATABASE.collection("Tests");
    let list = [];
    (await USERCOLLECTION.find({city:city}).toArray()).forEach((l) => {
        //console.log(l.tests);
      p=0;
      l.tests.forEach((e)=>
    {
        if(e.test_name==test)
        {
           p=1;
        }
    })
    //console.log(p)
    if(p==1)
    {
      //console.log(p+"hh");
        list.push(l.name);
    }
    });
    let outputArray = [];

    // Count variable is used to add the
    // new unique value only once in the
    // outputArray.
    let count = 0;

    // Start variable is used to set true
    // if a repeated duplicate value is
    // encontered in the output array.
    let start = false;

    for (let j = 0; j < list.length; j++) {
      for (let k = 0; k < outputArray.length; k++) {
        if (list[j] == outputArray[k]) {
          start = true;
        }
      }
      count++;
      if (count == 1 && start == false) {
        outputArray.push(list[j]);
      }
      start = false;
      count = 0;
    }

    console.log("output"+outputArray);
    return { outputArray };
  } catch (error) {
    console.log("err");
  }
};


module.exports = { list };
