
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URL;
console.log(uri);

 const MedDB=new MongoClient(uri);


async function connectToDB() {
    try {
        await MedDB.connect();
        const DATABASE = MedDB.db('MedfolioDB');
        const USERCOLLECTION = DATABASE.collection('Doctors');
        const db=[
            {
                "name": "John Doe",
                "email": "john.doe@example.com",
                "password": "hashed_password",  // Replace with a hashed password
                "specialization": "Cardiology",
                "collections": [],
                "city": "New York",
                "rating": 4.8
              }
              
         
        ]
        
        
        
         
        
        
          
      await USERCOLLECTION.insertMany(db);
        
    }
    catch(error){
        console.log(error);
    }
    finally {
        await MedDB.close();
    }
}

connectToDB();