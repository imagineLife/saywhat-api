const { DB } = require('../db');

class Crud extends DB{
  constructor(params) {
    super(params);
    if (!this.client) {
      throw new Error('Cannot call Crud without client')
    }
    if (!this.db) {
      throw new Error('Cannot call Crud without db')
    }
    this.collection = params.collection
  }

  // async register() { 
    
  // }

  createOne(obj) {
    console.log('createOne THIS')
    console.log(this)
    console.log('- - - -')
    
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
