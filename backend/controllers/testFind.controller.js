const { firebaseConfig } = require("../firebase/firebase.config");
const bcrypt = require("bcryptjs");
const { list } = require("../models/testFind.model");

const groupTests = async (req, res) => {
  const { city,test } = req.query;
  const { outputArray } = await list({ city,test });
  return res.status(200).json({ success: true, outputArray });
};

module.exports = { groupTests };
