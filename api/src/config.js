const {
    MONGO_URI,
    OPENAI_SECRET,
    APP_PORT
} = process.env

module.exports = {
    openaiSecret: OPENAI_SECRET,
    mongoUri: MONGO_URI,
    port: APP_PORT
}