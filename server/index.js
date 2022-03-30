//Dependencies
const { twoAreEqual } = require('./helpers')
const { 
  expressObj, 
  startServer,
  setupDB
} = require('./server-setup')
const { ServicesEmitter } = require('./global')
const { db: {
  NAME: DB_NAME,
  collections: {
    USERS
  }
} } = require('./global/constants')

async function startApi(){
  try{
    startServer(expressObj)

    if (!process.env.DB || process.env.DB === true) {
      const db_obj = {
        username: process.env.MONGO_DB_USER,
        pw: process.env.MONGO_DB_PW,
        host: process.env.MONGO_DB_HOST,
        port: process.env.MONGO_DB_PORT,
        authDB: process.env.MONGO_DB_AUTH_DB
      }
      let SayWhatMongoClient = await setupDB({ ...db_obj })
      let sayWhatDB = SayWhatMongoClient.registerDB(DB_NAME)
      // let users = new Crud({
      //   db: sayWhatDB,
      //   collection: USERS
      // })
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