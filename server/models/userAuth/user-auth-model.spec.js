const { UserAuth } = require('.');
const { setupDB } = require('./../../server-setup');


describe('UserAuth Model', () => { 
  const COLL_NAME = 'TestUsers';
  const DB_NAME = 'TestSayWhat';
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
    TestMongoClient = await setupDB({ ...db_obj });
    TestSayWhat = TestMongoClient.registerDB(DB_NAME);
    Cat = new UserAuth({ db: TestSayWhat, collection: COLL_NAME });
    console.log('Object.getOwnPropertyNames(Cat)')
    console.log(Object.getOwnPropertyNames(Cat))
  })

  afterAll(async () => { 
    await TestMongoClient.close()
  })

  it('Crud.collectionName matches input param', () => { 
    expect(Cat.collectionName).toBe(COLL_NAME)
  })

  const expectedKeys = [ 'connectionObj', 'client', 'db', 'collectionName', 'collection' ]
  it.each(expectedKeys)(`%s key is present`, (xKey) => { 
    const catKeys = Object.getOwnPropertyNames(Cat)
    expect(catKeys.includes(xKey)).toBe(true)
  })

  describe('methods work', () => {
    it('registerEmail', async () => { 
      let res = await Cat.registerEmail()
      expect(res).toBe('UserAuth signupMethod Here')
    })

    it('validateEmail', () => { 
      let res = Cat.validateEmail()
      expect(res).toBe('UserAuth validateEmail Here')
    })

    it('setPW', () => { 
      let res = Cat.setPW()
      expect(res).toBe('UserAuth setPW Here')
    })

    it('requestPwReset', () => { 
      let res = Cat.requestPwReset()
      expect(res).toBe('UserAuth requestPwReset Here')
    })
  })
  //   it('createOne', async () => {
  //     let testObj = { dog: 'horse' }
  //     testCreatedObject = await Cat.createOne(testObj)
  //     expect(Object.keys(testCreatedObject).toString()).toBe("acknowledged,insertedId")
  //     expect(testCreatedObject.acknowledged).toBe(true)
  //   })
  //   it('readOne', async () => {
  //     let testFoundObj = await Cat.readOne({_id: testCreatedObject.insertedId})
  //     expect(testCreatedObject.insertedId.toString()).toBe(testFoundObj._id.toString())
  //     expect(testFoundObj.dog).toBe('horse')
  //   })
  //   describe('updateOne', () => {
  //     const updateObj = { 'water': 'melon' };
  //     let expectedResObjKeys = {
  //       acknowledged: true,
  //       modifiedCount: 1,
  //       upsertedId: null,
  //       upsertedCount: 0,
  //       matchedCount: 1
  //     }
  //     let testUpdateRes;

  //     beforeAll(async () => {
  //       testUpdateRes = await Cat.updateOne({ _id: testCreatedObject.insertedId }, updateObj)
  //     })
  //     it('acknowledged === true', () => {
  //       expect(testUpdateRes.acknowledged).toBe(true)
  //     })
  //     it('modifiedCount === 1', () => {
  //       expect(testUpdateRes.modifiedCount).toBe(1)
  //     })
  //     it('upsertedId === null', () => {
  //       expect(testUpdateRes.upsertedId).toBe(null)
  //     })
  //     it('upsertedCount === 0', () => {
  //       expect(testUpdateRes.upsertedCount).toBe(0)
  //     })
  //     it('matchedCount === 1', () => {
  //       expect(testUpdateRes.matchedCount).toBe(1)
  //     })
  //     it('find obj and asserts updated key/val is present', async () => { 
  //       let found = await await Cat.readOne({ _id: testCreatedObject.insertedId })
  //       expect(found.water).toBe('melon')
  //     })

  //     it('throws err without 2 obj params', async () => {
  //       try {
  //         await Cat.updateOne({ _id: testCreatedObject.insertedId })
  //       } catch (e) { 
  //         expect(e.message).toBe('Cannot call TestUsers.updateOne without 2 object params: 1 the find obj, 2 the update obj')
  //       }
  //     })
      
  //   })
  //   describe('deleteOne', () => { 
  //     describe('works', () => { 
  //       it('finds, deletes, can not find the record', async () => { 

  //         // find one
  //         let deleteFoundObj = await Cat.readOne()
  //         expect(deleteFoundObj._id).toBeTruthy()
          
  //         let deletedObj = await Cat.deleteOne({ id: deleteFoundObj._id })
  //         expect(JSON.stringify(deletedObj)).toBe(JSON.stringify({ acknowledged: true, deletedCount: 1 }))
  //       })
  //     })
  //   })
  // })
})