const { firebaseConfig } = require("../firebase/firebase.config");
const bcrypt = require("bcryptjs");
const { group } = require("../models/groupdoctors.model");

const groupDoctors = async (req, res) => {
  const { location,speciality } = req.query;
  const { groupDoctors } = await group({ location,speciality });
  console.log(groupDoctors);

  return res.status(200).json({ success: true, groupDoctors });
};

module.exports = { groupDoctors };
