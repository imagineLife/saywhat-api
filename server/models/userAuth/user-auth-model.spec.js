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
    
    describe('createOne', () => { 
      it('fails with invalid email string', async () => { 
        try { 
          await Cat.createOne({email: 'horse'})
        } catch (e) {
          expect(e.message).toBe(`Cannot call UserAuth createOne without a valid email address`)
        }
      })
    })

    describe('oneHourFromNow', () => { 
      it('works', () => { 
        const timeRes = Cat.oneHourFromNow()
        expect(typeof timeRes).toBe('object')
      })
      
    })

    describe('registrationExpired', () => {
      it('returns false with timestamps is now', () => { 
        let now = new Date()
        let nowInMS = Date.parse(now)
        let overAnHourAgo = nowInMS - Cat.registration_exp_duration - 10
        let hourAgoDate = new Date(overAnHourAgo)
        let expired = Cat.registrationExpired(hourAgoDate)
        expect(expired).toBe(true)
      })

      it('returns true with timestamps is 1 hour - 10 ms ago', () => { 
        let now = new Date()
        let expired = Cat.registrationExpired(now)
        expect(expired).toBe(false)
      })
    })

    describe('validateEmailString', () => { 
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
      describe('returns error...', () => {
        it('without email param', async () => { 
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

      describe('works', () => { 
        let res;
        const registerEmailStr = 'horse@sauce.com'
        
        beforeAll(async () => { 
          await Cat.deleteOne({id: registerEmailStr})
        })
        afterAll(async () => { 
          await Cat.deleteOne({id: registerEmailStr})
        })
        
        it('method returns expected object', async () => { 
          res = await Cat.registerEmail({ email: registerEmailStr })          

          // types
          expect(typeof res).toBe('object');
          expect(typeof res.insertedId).toBe('string')
          expect(typeof res.acknowledged).toBe('boolean') 

          // res object inspection
          expect(Object.keys(res).length).toBe(2)
          expect(res.acknowledged).toBe(true)
          expect(res.insertedId).toBe(registerEmailStr)
        })
        
        it('GETS user from db by id && assures expected fields exist', async () => { 
          let foundUser = await Cat.readOne({ _id: res.insertedId })
          expect(foundUser._id).toBe(registerEmailStr)
          expect(typeof foundUser.created_date).toBe('object')
          expect(typeof foundUser.registration_expires).toBe('object')
        })
      })
    })

    describe('validateEmail', () => { 
      const validateEmailStr = 'validate@email.stringtest';
      let createUserRes;

      beforeEach(async () => { 
        await Cat.deleteOne({id: validateEmailStr})
      })
      afterEach(async () => { 
        await Cat.deleteOne({id: validateEmailStr})
      })
    
      describe('fails when', () => { 
        it('bad user email address', async () => { 
          createUserRes = await Cat.registerEmail({ email: validateEmailStr });
          try {
            let res = await Cat.validateEmail({ email: 'water@mel-uhn' })
          } catch (e) { 
            expect(e.message).toBe('Cannot call validateEmail without a valid email address')
          }
        })
        it('user email is not present', async () => { 
          createUserRes = await Cat.registerEmail({ email: validateEmailStr });
          let res = await Cat.validateEmail({ email: 'thisUser@isnot.present' })
          expect(res).toBe(false)
        })
      })

      it('returns true from email created now', async () => {
        // create user
        createUserRes = await Cat.registerEmail({ email: validateEmailStr })   
        let validateEmailRes = await Cat.validateEmail({email: createUserRes.insertedId })
        expect(validateEmailRes).toBe(true)
        // validate user
      })
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