const { MongoClient, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const MONGO_URL = process.env.MONGO_URL;
const MedDB = new MongoClient(MONGO_URL);

const list = async () => {
  try {
    await MedDB.connect();
    const DATABASE = MedDB.db("MedfolioDB");
    const USERCOLLECTION = DATABASE.collection("Tests");
    let list = [];
    (await USERCOLLECTION.find({}).toArray()).forEach((l) => {
      list.push(l.city);
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
    return { outputArray };
  } catch (error) {
    console.log("err");
  }
};


module.exports = { list };
