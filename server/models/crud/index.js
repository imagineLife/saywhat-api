const { DB } = require('../db');

class Crud extends DB{
  constructor(params){
    super(params);
    this.collection = params.collection
  }

  createOne(obj){
    return `Creating One on ${this.collection} where ${JSON.stringify(obj)}`
  }
  read(obj){
    return `Getting on ${this.collection} where ${JSON.stringify(obj)}`
  }
  update(obj){
    return `Updating on ${this.collection} where ${JSON.stringify(obj)}`
  }
  delete(obj){
    return `deleting on ${this.collection} where ${JSON.stringify(obj)}`
  }
}

module.exports = {
  Crud
}
