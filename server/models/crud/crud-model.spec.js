const { Crud } = require('.');
const { setupDB } = require('./../../server-setup');

describe('CRUD Model', () => {

  describe('Crud Model', () => { 
    let TestMongoClient;
    let TestSayWhat;
    let Cat;
    let testCreatedObject;
    beforeAll(async () => {
      process.env.MONGO_AUTH = false;
      const db_obj = {
        host: 'localhost',
        port: '27017'
      }
      TestMongoClient = await setupDB({ ...db_obj })
      TestSayWhat = TestMongoClient.registerDB('TestSayWhat')
      Cat = new Crud({ db: TestSayWhat, collection: 'TestCollection' })
    })

    afterAll(async () => { 
      await TestMongoClient.close()
    })

    it('Crud.collectionName matches input param', () => { 
      expect(Cat.collectionName).toBe('TestCollection')
    })

    const expectedKeys = [ 'connectionObj', 'client', 'db', 'collectionName', 'collection' ]
    it.each(expectedKeys)(`%s key is present`, (xKey) => { 
      const catKeys = Object.getOwnPropertyNames(Cat)
      expect(catKeys.includes(xKey)).toBe(true)
    })

    it('createOne then readOne works with matching _id', async () => {
      let testObj = { dog: 'horse' }
      testCreatedObject = await Cat.createOne(testObj)
      let testFoundObj = await Cat.readOne({_id: testCreatedObject.insertedId})
      expect(testCreatedObject.insertedId.toString()).toBe(testFoundObj._id.toString())
    })

    describe('errors throw with disconnected DB', () => { 
      beforeAll(async () => { 
        await TestMongoClient.close();
      })

      it('createOne', async () => {
        let testObj = { failable: 'obj' }
        
        try {
          await Cat.createOne(testObj)
        } catch (e) { 
          expect(e.message).toBe('MongoNotConnectedError: MongoClient must be connected to perform this operation')
        }
      })

      it('readOne', async () => {
        try {
          await Cat.readOne({_id: testCreatedObject.insertedId})
        } catch (e) { 
          expect(e.message).toBe('MongoNotConnectedError: MongoClient must be connected to perform this operation')
        }
      })
    })
  })
})