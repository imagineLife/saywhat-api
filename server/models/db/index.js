const { MongoClient } = require('mongodb');
const { GLOBAL_STATE } = require('./../../global');
class DB{
  constructor({ connectionObj, dbName }) {
    this.connectionObj = connectionObj;
    this.client = null;
    this.dbName = dbName;
  }

  /*
    takes db connection obj
      username
      pw
      host
      port
      authDB
    returns the client
  */ 
  async connect() {
    try {      
      // Connect
      const uriStr = require('./../../database').makeConnectionString(this.connectionObj)
      this.client = new MongoClient(uriStr);
      await this.client.connect();

      // store 
      GLOBAL_STATE.DB_CONNECTED = true;
      console.log(`SERVER: Connected to mongo db on ${this.connectionObj.host}:${this.connectionObj.port}`)
      // await setupStores(mongoClient);

      return this.client;
    } catch (e) {
      console.log(`DB Class connect method error:`)
      console.log(e);
    }
  }

  close() {
    this.client.close();
    console.log(`CLOSED db connection on ${this.connectionObj.host}:${this.connectionObj.port}`)
    
  }

  async getAndLogDBs() {
    let databasesList = await this.client.db().admin().listDatabases();
    const { databases } = databasesList
    console.table(databases)
    return databases;
  };
}

module.exports = {
  DB
}