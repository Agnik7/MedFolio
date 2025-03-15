



const diseaseAnalyse = async({username, email, hashedPassword, userType, profilePic, specialization, city})=>{
    let existing = false;
    try {
        await MedDB.connect();
        const DATABASE = MedDB.db('MedfolioDB');
        let USERCOLLECTION;
        let user;
        if(userType === 'patient')
        {
            user = {
                name:username,
                email:email,
                password: hashedPassword,
                type:userType,
                profilePic: profilePic,
                appointments: [],
                search_history:[],
                tests:[]
            };
            USERCOLLECTION = DATABASE.collection('User');

        }
        else
        {
            user = {
                name:username,
                email:email,
                password: hashedPassword,
                type:userType,
                profilePic: profilePic,
                specialization: specialization,
                appointments: [],
                rating: 0,
                city:city
            };
            USERCOLLECTION = DATABASE.collection('Doctors')
        }
        const existingUser = await USERCOLLECTION.findOne({ email: email });
        if (existingUser) {
            existing = true;
            throw new Error("User exists in database");
          }
        const insertUser = await USERCOLLECTION.insertOne(user);
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET
          );
          //user._id=user._id;
          user.email = email;
          user.name = username;
          user.token = token;
          delete user.password;
          return {user:user, error: null, status:200};
    }
    catch(error){
        return {token: null, error: error, status: existing?400:500};
    }
    finally {
        await MedDB.close();
    }
}