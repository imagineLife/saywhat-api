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

  describe('methods', () => {
    describe('validateEmail', () => { 
      const failArr = ['water@melon', '@melon.sauce', 'water.sauce', 'ice@water@melon.sause.com']
      const passingArr = ['juice@box.com','water@melon.com','water.melon@hotSauce.com']
      it.each(failArr)(`fails with %s`, (str) => { 
        expect(Cat.validateEmailString(str)).toBe(null)
      })
      it.each(passingArr)(`passes with %s`, (passingStr) => { 
        expect(Cat.validateEmailString(passingStr)[0]).toBe(passingStr.toLowerCase())
      })
    })
    describe('registerEmail', () => { 
      describe('returns error', () => {
        it('without email param', async () => { 
          try {
            await Cat.registerEmail()
          } catch (e) {
            expect(e.message).toBe("Cannot destructure property 'email' of 'undefined' as it is undefined.")
          }
        })

        const failArr = ['water@melon', '@melon.sauce', 'water.sauce', 'ice@water@melon.sause.com']
        it.each(failArr)('without valid email address %s', async (str) => { 
          try {
            await Cat.registerEmail({email: str})
          } catch (e) {
            expect(e.message).toBe('Cannot call registerEmail without a valid email address')
          }
        })
      })

      it('works', async () => { 
        const res = await Cat.registerEmail({email: 'horse@sauce.com'})
        expect(res).toBe('UserAuth signupMethod Here')
      })
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
})