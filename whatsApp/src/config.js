require('dotenv').config();
const {
    APP_PORT,
    MONGODB_URL,
    APP_VERSION,
    JWT_SECRET,
    DOMAIN,
    GOOGLE_CLIENT_ID,
    GOOGLE_SECRET,
    GOOGLE_CALLBACK_URL,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_USER,
    REDIS_PASS,
    MAILGUN_API,
    MAILGUN_DOMAIN,
    FIREBASE_BUCKET
} = process.env;

module.exports = {
    app: {
        port: APP_PORT || 4000,
        appVersion: APP_VERSION || "v1",
        jwtSecret: JWT_SECRET,
        googleClient: GOOGLE_CLIENT_ID,
        googleSecrete: GOOGLE_SECRET,
        googleCallbackURL: GOOGLE_CALLBACK_URL,
        domain: DOMAIN ,
        mailgunApiKey:MAILGUN_API, 
        mailgunDomain :MAILGUN_DOMAIN  ,
     },
    redis: {
        host: REDIS_HOST,
        port: REDIS_PORT,
        user: REDIS_USER,
        password: REDIS_PASS
    },
    endpoints: {
        mongoUrl: MONGODB_URL || "mongodb://localhost:27017/twcdbvo"
    },
    // firebase:{
    //     bucket: FIREBASE_BUCKET || "gs://africaudio.appspot.com",
    //     serviceAccount: require("./firebase.json")
    // }
    

}

