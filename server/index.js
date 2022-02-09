//Dependencies
const { twoAreEqual } = require('./helpers')
const { 
  expressObj, 
  startServer 
} = require('./server-setup')
const { connectDB } = require('./db')

if (twoAreEqual(require.main, module)) {
  try{
    startServer(expressObj)
    connectDB({
      username: process.env.MONGO_DB_USER,
      pw: process.env.MONGO_DB_PW,
      host: process.env.MONGO_DB_HOST,
      port: process.env.MONGO_DB_PORT,
      authDB: process.env.MONGO_DB_AUTH_DB
    })
  }catch(e){
    console.log(e)
  }
}

module.exports = {
  startServer
};