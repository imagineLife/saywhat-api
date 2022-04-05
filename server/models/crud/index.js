const { DB } = require('../db');

class Crud extends DB{
  constructor(props) {
    super(props)
    this.db = props.db
    this.collectionName = props.collection;
    this.collection = this.db.collection(props.collection);
  }

  /*
    - setups up a collection if not already present
    - stores collection name in state var
  */

  async createOne(obj) {
    try {
      return await this.collection.insertOne(obj)
    } catch (e) { 
      console.log(`${this.collectionName} createOne error`)
      throw new Error(e)
    }
  }

  async readOne(obj){
     try {
      return await this.collection.findOne(obj)
    } catch (e) { 
      console.log(`${this.collectionName} readOne error`)
      throw new Error(e)
    }
  }
 
  async updateOne(findObj, updateObj) {
    if (!findObj || !updateObj) { 
      throw new Error(`Cannot call ${this.collectionName}.updateOne without 2 object params: 1 the find obj, 2 the update obj`)
    }
     try {
      return await this.collection.updateOne(findObj, { $set: updateObj })
     } catch (e) { 
      console.log(`${this.collectionName} updateOne error`)
      throw new Error(e)
    }
  }
  
  async deleteOne(deleteObj) {
    if (!deleteObj) { 
      throw new Error(`Cannot call ${this.collectionName}.deleteOne without an object param`)
    }
    if (!deleteObj.id) { 
      throw new Error(`Cannot call ${this.collectionName}.deleteOne without 'id' key`)
    }
     try {
       return await this.collection.deleteOne({_id: deleteObj.id})
     } catch (e) {
      console.log(`${this.collectionName} deleteOne error`)
      throw new Error(e)
    }
  }

}

module.exports = {
  Crud
}
