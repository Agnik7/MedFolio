const { createClient } = require('@supabase/supabase-js');
const { MongoClient, ObjectId } = require("mongodb");
const MONGO_URL = process.env.MONGO_URL;
const MedDB=new MongoClient(MONGO_URL);
const url = process.env.SUPABASE_URL;
const publicKey = process.env.SUPABASE_PUBLIC_KEY;
// Create a single supabase client for interacting with your database
const supabase = createClient(url, publicKey);
const fetchPrescription = async ({ userEmail, doctorEmail }) => {
    try {
        await MedDB.connect();
        const DATABASE = MedDB.db('MedfolioDB');
        let USERCOLLECTION = DATABASE.collection('User');
        let DOCTORCOLLECTION = DATABASE.collection('Doctors');
        const user = await USERCOLLECTION.findOne({ email: userEmail });
        const doctor = await DOCTORCOLLECTION.findOne({ email: doctorEmail });
        const { data, error } = await supabase
      .from('prescriptions')
      .select()
      .eq('user_id', user._id.toHexString())
      .eq('doctor_id', doctor._id.toHexString());
    
    if (error) {
      console.error("Error fetching data:", error);
      return {data:[]}
    } else {
      return { data:data };
    }
      } catch (error) {
        console.error("Error fetching user and doctor:", error);
        return false;
      } finally {
        await MedDB.close();
      }
    
  };
  const addPrescription = async ({ userEmail, doctorEmail, details }) => {
    try {
        await MedDB.connect();
        const DATABASE = MedDB.db('MedfolioDB');
        let USERCOLLECTION = DATABASE.collection('User');
        let DOCTORCOLLECTION = DATABASE.collection('Doctors');
        const user = await USERCOLLECTION.findOne({ email: userEmail });
        const doctor = await DOCTORCOLLECTION.findOne({ email: doctorEmail });
        const { data, error } = await supabase
      .from('prescriptions')
      .insert([
        { details: details, user_id: user._id.toHexString(), doctor_id: doctor._id.toHexString() }
      ]);
  
        if (error) {
        console.error("Error adding prescription:", error);
        return false;
        } else {
        return true;
        }
      } catch (error) {
        console.error("Error fetching user and doctor:", error);
        return false;
      } finally {
        await MedDB.close();
      }
    
  };
  const updatePrescription = async ({ userEmail, doctorEmail, details }) => {
    try {
        await MedDB.connect();
        const DATABASE = MedDB.db('MedfolioDB');
        let USERCOLLECTION = DATABASE.collection('User');
        let DOCTORCOLLECTION = DATABASE.collection('Doctors');
        const user = await USERCOLLECTION.findOne({ email: userEmail });
        const doctor = await DOCTORCOLLECTION.findOne({ email: doctorEmail });
        const { data, error } = await supabase
      .from('prescriptions')
      .update({ details: details })
      .eq('user_id', user._id.toHexString())
      .eq('doctor_id', doctor._id.toHexString());
  
        if (error) {
        console.error("Error updating prescription:", error);
        return false;
        } else {
        return true;
        }
      } catch (error) {
        console.error("Error fetching user and doctor:", error);
        return false;
      } finally {
        await MedDB.close();
      }
};
  module.exports = { fetchPrescription, addPrescription, updatePrescription };