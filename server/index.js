//Dependencies
const { twoAreEqual } = require('./helpers')
const { 
  expressObj, 
  startServer,
  setupDB
} = require('./server-setup')
const { Crud } = require('./models')
const { ServicesEmitter } = require('./global')
const { db: {
  NAME: DB_NAME,
  collections: {
    USERS,
    SPEECHES
  }
} } = require('./global/constants')
const { GLOBAL_STATE } = require('./global')
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

      /* Register */
      let Speeches = new Crud({
        db: sayWhatDB,
        collection: SPEECHES
      })

      GLOBAL_STATE.Collections.Speeches = Speeches;



      // let res = await users.createOne({water: 'melon'})
      // delete res.acknowledged;
      // console.log('----create-user-res----')
      // console.log(res)
      // console.log('res.insertedId')
      // console.log(res.insertedId)
      
      // let found = await users.readOne({_id: res.insertedId})
      // console.log('found')
      // console.log(found)

      // let updated = await users.updateOne({ horse: 'dog' }, { water: 'lemon' })
      // console.log('updated')
      // console.log(updated)
      
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