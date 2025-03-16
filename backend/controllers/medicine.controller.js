const { firebaseConfig } = require("../firebase/firebase.config");
const bcrypt = require("bcryptjs");
const { medi } = require("../models/medicine.model");

const groupMedicine = async (req, res) => {
  const { medicine } = req.query;
  const { list} = await medi({ medicine });

  return res.status(200).json({ success: true, list });
};

module.exports = { groupMedicine };
