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
    describe('oneHourFromNow', () => { 
      it('works', () => { 
        const timeRes = Cat.oneHourFromNow()
        expect(typeof timeRes).toBe('object')
      })
      
    })
    describe('validateEmail', () => { 
      const failArr = ['water@melon', '@melon.sauce', 'water.sauce', 'ice@water@melon.sause.com']
      const passingArr = ['juice@box.com', 'water@melon.com', 'water.melon@hotSauce.com']
      describe('fails with...', () => { 
        it.each(failArr)(`%s`, (str) => { 
          expect(Cat.validateEmailString(str)).toBe(null)
        })
      })
      describe('passes with...', () => { 
        it.each(passingArr)(`%s`, (passingStr) => { 
          expect(Cat.validateEmailString(passingStr)[0]).toBe(passingStr.toLowerCase())
        })
      })
    })
    describe('registerEmail', () => { 
      describe('returns error without...', () => {
        it('email param', async () => { 
          try {
            await Cat.registerEmail()
          } catch (e) {
            expect(e.message).toBe("Cannot destructure property 'email' of 'undefined' as it is undefined.")
          }
        })

        const failArr = ['water@melon', '@melon.sauce', 'water.sauce', 'ice@water@melon.sause.com']
        it.each(failArr)('valid email address %s', async (str) => { 
          try {
            await Cat.registerEmail({email: str})
          } catch (e) {
            expect(e.message).toBe('Cannot call registerEmail without a valid email address')
          }
        })
      })

      it('works', async () => { 
        const res = await Cat.registerEmail({ email: 'horse@sauce.com' })
        expect(res).toBe(true)
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

  describe('ERR methods', () => { 
    beforeEach(async () => { 
      await TestMongoClient.close();
    })
    afterEach(async () => { 
      await TestMongoClient.connect();
    })
    it('registerEmail', async () => { 
      try {
        await Cat.registerEmail({email:'failable@user.emailaddress'})
      } catch (e) { 
        expect(e.message).toBe('Error: MongoNotConnectedError: MongoClient must be connected to perform this operation')
      }
    })
  })
})