const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URL;

const MedDB = new MongoClient(uri);

async function connectToDB() {
    try {
        await MedDB.connect();
        const DATABASE = MedDB.db('MedfolioDB');
        const USERCOLLECTION = DATABASE.collection('User');
        const DOCTORCOLLECTION = DATABASE.collection('Doctors');
                  
        // Update all users to set "appointments" and "search_history" to empty arrays
        await USERCOLLECTION.updateMany(
            {}, // Filter: empty filter to update all documents
            {
                $set: {
                    appointments: [],
                    search_history: []
                }
            }
        );
    } catch (error) {
        console.log(error);
    } finally {
        await MedDB.close();
    }
}

connectToDB();
