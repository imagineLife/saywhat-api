const { MongoClient } = require('mongodb');
const { MONGO_CLIENT } = require('./../global/state')
function makeConnectionString({
  username,
  pw,
  host,
  port,
  authDB
}){
  if(typeof host === 'undefined' ||
    typeof port === 'undefined'){
      throw 'Cannot create db connection with missing param';
    }
  if(
    !process.env.MONGO_AUTH &&
    (!username ||
    !pw ||
    !authDB)
  ){
    throw 'Cannot create db connection with missing param';
  }

  // no auth?!
  if(process?.env?.MONGO_AUTH?.toString() === 'false'){
    return `mongodb://${host}:${port}`;  
  }

  //auth'd
  return `mongodb://${username}:${pw}@${host}:${port}/?authSource=${authDB}`;
}

async function getAndListDBs(mongoClient) {
    databasesList = await mongoClient.db().admin().listDatabases();
    const { databases } = databasesList
    console.table(databases)
};

async function connectDB(connectionParams) {
  try {
    const uriStr = makeConnectionString(connectionParams)
    const mongoClient = new MongoClient(uriStr);
    await mongoClient.connect();
    await getAndListDBs(mongoClient);
      
    return true;
  } catch (e) {
    console.log(`connectDB fn error:`)
    console.log(e);
  }
}

module.exports = {
  makeConnectionString,
  connectDB,
  getAndListDBs
}