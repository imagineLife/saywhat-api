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

    describe('methods work with persistent object', () => { 
      it('createOne', async () => {
        let testObj = { dog: 'horse' }
        testCreatedObject = await Cat.createOne(testObj)
        expect(Object.keys(testCreatedObject).toString()).toBe("acknowledged,insertedId")
        expect(testCreatedObject.acknowledged).toBe(true)
      })
      it('readOne', async () => {
        let testFoundObj = await Cat.readOne({_id: testCreatedObject.insertedId})
        expect(testCreatedObject.insertedId.toString()).toBe(testFoundObj._id.toString())
        expect(testFoundObj.dog).toBe('horse')
      })
      describe('updateOne', () => {
        const updateObj = { 'water': 'melon' };
        let expectedResObjKeys = {
          acknowledged: true,
          modifiedCount: 1,
          upsertedId: null,
          upsertedCount: 0,
          matchedCount: 1
        }
        let testUpdateRes;

        beforeAll(async () => {
          testUpdateRes = await Cat.updateOne({ _id: testCreatedObject.insertedId }, updateObj)
        })
        it('acknowledged === true', () => {
          expect(testUpdateRes.acknowledged).toBe(true)
        })
        it('modifiedCount === 1', () => {
          expect(testUpdateRes.modifiedCount).toBe(1)
        })
        it('upsertedId === null', () => {
          expect(testUpdateRes.upsertedId).toBe(null)
        })
        it('upsertedCount === 0', () => {
          expect(testUpdateRes.upsertedCount).toBe(0)
        })
        it('matchedCount === 1', () => {
          expect(testUpdateRes.matchedCount).toBe(1)
        })
        it('find obj and asserts updated key/val is present', async () => { 
          let found = await await Cat.readOne({ _id: testCreatedObject.insertedId })
          expect(found.water).toBe('melon')
        })

        it('throws err without 2 obj params', async () => {
          try {
            await Cat.updateOne({ _id: testCreatedObject.insertedId })
          } catch (e) { 
            expect(e.message).toBe('Cannot call TestCollection.updateOne without 2 object params: 1 the find obj, 2 the update obj')
          }
        })
        
      })
      describe('deleteOne', () => { 
        describe('throws', () => { 
          it('with no object parameter', async () => { 
            try {
              await Cat.deleteOne()
            } catch (e) { 
              expect(e.message).toBe('Cannot call TestCollection.deleteOne without an object param')
            }
          })
          it('with no "id" key in the obj param', async () => { 
            try {
              await Cat.deleteOne({horse: 'dog'})
            } catch (e) { 
              expect(e.message).toBe('Cannot call TestCollection.deleteOne without \'id\' key')
            }
          })
        })
        describe('works', () => { 
          it('finds, deletes, can not find the record', async () => { 

            // find one
            let deleteFoundObj = await Cat.readOne()
            expect(deleteFoundObj._id).toBeTruthy()
            
            let deletedObj = await Cat.deleteOne({ id: deleteFoundObj._id })
            expect(JSON.stringify(deletedObj)).toBe(JSON.stringify({ acknowledged: true, deletedCount: 1 }))
            
            
          })
        })
      })
    })

    describe('errors throw when db is disconnected', () => { 
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
      it('updateOne', async () => {
        try {
          await Cat.updateOne({ _id: testCreatedObject.insertedId }, {poiu: 'lkjh'})
        } catch (e) { 
          expect(e.message).toBe('MongoNotConnectedError: MongoClient must be connected to perform this operation')
        }
      })
      it('deleteOne', async () => {
        try {
          await Cat.deleteOne({id: 'horse'})
        } catch (e) { 
          expect(e.message).toBe('MongoNotConnectedError: MongoClient must be connected to perform this operation')
        }
      })
    })
  })
})