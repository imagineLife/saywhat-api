const { MongoClient } = require('mongodb');
const { GLOBAL_STATE } = require('./../global')

function makeConnectionString({
  username,
  pw,
  host,
  port,
  authDB
}){
  // Error Handling
  if(typeof host === 'undefined' ||
    typeof port === 'undefined'){
      console.log(`missing vars: host: ${host}, port: ${port}`)
      
      throw 'Cannot create db connection with missing param';
    }
  if(
    !process.env.MONGO_AUTH &&
    (!username ||
    !pw ||
    !authDB)
  ){
    console.log(`Expected auth connection to db`)
    throw 'Cannot create db connection with missing param';
  }

  // no auth?!
  if(process?.env?.MONGO_AUTH?.toString() === 'false'){
    return `mongodb://${host}:${port}/?connectTimeoutMS=2500`;
  }

  //auth'd
  return `mongodb://${username}:${pw}@${host}:${port}/?authSource=${authDB}`;
}

async function getAndLogDBs(mongoClient) {
    databasesList = await mongoClient.db().admin().listDatabases();
    const { databases } = databasesList
    console.table(databases)
};

async function setupDB(connectionParams) {
  console.log('Connecting to db')
  
  try {
    // Connect
    const uriStr = makeConnectionString(connectionParams)
    const mongoClient = new MongoClient(uriStr);
    await mongoClient.connect();

    // store 
    GLOBAL_STATE.DB_CONNECTED = true;
    console.log('SERVER: Connected to mongo db!')
    return mongoClient;
  } catch (e) {
    console.log(`setupDB fn error:`)
    console.log(e);
  }
}

async function closeDBConnection(mongoClient){
  return await mongoClient.close()
}

module.exports = {
  makeConnectionString,
  setupDB,
  getAndLogDBs,
  closeDBConnection
}