class DB{
  constructor({mongoClient, db}){
    this.client = mongoClient;
    this.db = db;
  }
}

module.exports = {
  DB
}