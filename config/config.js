require('dotenv').config()
// console.log(process.env)
const config = {
    isVercel: process.env.IS_VERCEL || false,
    port: process.env.PORT || 3000,
    mongodb: {
        uri: process.env.MONGODB_URI,
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD,
    }
}
module.exports = config