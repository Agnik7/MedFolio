const { MongoClient } = require("mongodb");
const MONGO_URL = process.env.MONGO_URL;
const MedDB = new MongoClient(MONGO_URL);

const diseaseAnalyse = async({ userEmail, text, textSymptom, imageURL, city }) => {
    let existing = false;
    try {
        await MedDB.connect();
        const DATABASE = MedDB.db('MedfolioDB');
        const USERCOLLECTION = DATABASE.collection('User');
        const DOCTORCOLLECTION = DATABASE.collection('Doctors');

        // Fetch doctors based on specialization and city
        const doctorList = await DOCTORCOLLECTION.find({
            specialization: text.doctor,
            city: city
        }).toArray();

        // Update user's search history
        await USERCOLLECTION.updateOne(
            { email: userEmail },
            {
                $push: {
                    search_history: {
                        textSymptom: textSymptom || null,
                        imageURL: imageURL || null,
                        disease: text.disease,
                        specialist: text.doctor,
                        doctorList: doctorList
                    }
                }
            }
        );

        // Return the list of doctors
        return doctorList;
    }
    catch (error) {
        console.error("Error in diseaseAnalyse:", error);
        return { token: null, error: error, status: existing ? 400 : 500 };
    }
    finally {
        await MedDB.close();
    }
}

module.exports = { diseaseAnalyse };
