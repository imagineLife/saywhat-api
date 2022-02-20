//Dependencies
const { twoAreEqual } = require('./helpers')
const { 
  expressObj, 
  startServer 
} = require('./server-setup')
const { ServicesEmitter } = require('./global')
const { setupDB } = require('./db')

async function startApi(){
  try{
    startServer(expressObj)
    if(!process.env.DB || process.env.DB === true){
      await setupDB({
        username: process.env.MONGO_DB_USER,
        pw: process.env.MONGO_DB_PW,
        host: process.env.MONGO_DB_HOST,
        port: process.env.MONGO_DB_PORT,
        authDB: process.env.MONGO_DB_AUTH_DB
      })
    }
  }catch(e){
    console.log(e)
  }
}

if (twoAreEqual(require.main, module)) {
  startApi()
}

module.exports = {
  startServer
};