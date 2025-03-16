const { firebaseConfig } = require("../firebase/firebase.config");
const bcrypt = require("bcryptjs");
const { list } = require("../models/testFee.model");

const fee = async (req, res) => {
  const { test,name,city } = req.query;
  const {fees} = await list({ test,name,city });
  return res.status(200).json({ success: true, fees });
};


module.exports = { fee };
