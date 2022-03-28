const {
  makeConnectionString,
  // setupDB,
  getAndLogDBs,
  closeDBConnection,
  setupCollection
} = require('.')
const { MongoClient } = require('mongodb');

/*
  username,
  pw,
  host,
  port,
  authDB
*/
describe('DB Setup', () => {
  describe('makeConnectionString', () => {
    describe('fails without', () => {
      describe('host & port, required always', () => {
        it('port', () => {
          let these = { }
          these.host = 'localhost';
          expect(() => {
            makeConnectionString(these)
          }).toThrow()
        })
        it('host', () => {
          let these = { }
          these.port = '27017';
          expect(() => {
            makeConnectionString(these)
          }).toThrow()
        })
      })
      const mockProps = {}
      mockProps.username = 'water',
      mockProps.pw = 'melon';
      mockProps.host = 'chicken';
      mockProps.port = 'gritz';
      it('authDB', () => {
        expect(() => {
          makeConnectionString(mockProps)
        }).toThrow()
      })
      it('pw', () => {
        let these = {...mockProps}
        these.authDB = 'sauce';
        delete these.pw;
        expect(() => {
          makeConnectionString(these)
        }).toThrow()
      })
      it('username', () => {
        let these = {...mockProps}
        these.authDB = 'sauce';
        delete these.username;
        expect(() => {
          makeConnectionString(these)
        }).toThrow()
      })
    })
    describe('succeeds', ()=> {
      it('AUTH with all props', () => {
        const mockProps = {}
        mockProps.username = 'water',
        mockProps.pw = 'melon';
        mockProps.host = 'chicken';
        mockProps.port = 'greitz';
        mockProps.authDB = 'qwer'
        let EXPECTED_STR = `mongodb://${mockProps.username}:${mockProps.pw}@${mockProps.host}:${mockProps.port}/?authSource=${mockProps.authDB}`
        expect(makeConnectionString(mockProps)).toBe(EXPECTED_STR)
      })
      describe('UNAUTHD with no un/pw/authDB', () => {
        beforeEach(() => {
          process.env.MONGO_AUTH = false;
        })
        it('fails', () => {
          const mockProps = {}
          mockProps.host = 'chicken';
          mockProps.port = 'gritz';
          let EXPECTED_STR = `mongodb://${mockProps.host}:${mockProps.port}/?connectTimeoutMS=2500`
          expect(makeConnectionString(mockProps)).toBe(EXPECTED_STR)
        })
      })
    })
  })
  // describe('setupDB', () => {
  //   describe('logs error strings without expected connection param', () => {
  //     beforeEach(() => {
  //         delete process.env.MONGO_AUTH;
  //       })
  //       it('authDB', () => {
  //         jest.spyOn(global.console, 'log')
  //         const mockProps = {}
  //         mockProps.port = '27017';
  //         setupDB(mockProps)
  //         expect(console.log).toHaveBeenCalledWith('setupDB fn error:')
  //         expect(console.log).toHaveBeenCalledWith('Cannot create db connection with missing param')
  //       })
  //   })
  //   describe('Connects & returns list of dbs', () => {
  //     let mongoConnection;
  //     const testConnection = {
  //         host: 'localhost',
  //         port: '27017'
  //       }
      
  //     beforeAll(() => {
  //       jest.spyOn(global.console, 'table')
  //     })
  //     beforeEach(async function(){
  //       process.env.MONGO_AUTH = false;
  //       try{
  //         mongoConnection = await setupDB(testConnection);
  //       }catch(e){
  //         console.log('ERROR:');
  //         console.log(e);
  //       }
  //     });

  //     it('has internal state url matching connection params', () => {
  //       // https://github.com/mongodb/node-mongodb-native/blob/a766f1c/src/mongo_client.ts#L324
  //       expect(mongoConnection.s.url).toBe(`mongodb://${testConnection.host}:${testConnection.port}/?connectTimeoutMS=2500`)
  //     })

  //     it('returns list of dbs', async () => {
  //       await getAndLogDBs(mongoConnection)
  //       // including previous test & code log counts
  //       expect(console.table).toHaveBeenCalledTimes(1)
  //     })

  //     afterEach(async function(){
  //       if(mongoConnection){
  //         await closeDBConnection(mongoConnection);
  //       }
  //     });
  //   })
  // })
  describe('setupCollection', () => {
    const uriString = 'mongodb://localhost:27017/?connectTimeoutMS=2500'
    let mongoClient;
    let mockState = {}
    let mockDb;
    /*
      run order hooks
    */
    beforeAll(() => {
      mongoClient = new MongoClient(uriString)
      jest.spyOn(global.console, 'log')
      mockDb = mongoClient.db('MockDb')
      return  mongoClient.connect()
    })

    afterAll(() => {
      mongoClient.close()
    })

    describe('succeeds', () => {  
      afterEach(() => { 
        return mockDb.collection('Sauce').drop()
      })

      // tests
      it('calls createCollection with expected cName Param', async function(){  
        await setupCollection({
          cName: 'Sauce',
          db: mockDb,
          state: mockState
        })
        expect(console.log).toHaveBeenCalledWith('DB: collection Sauce setup')
      })
    })


    describe('fails', () => {
      beforeEach(() => {
        jest.spyOn(global.console, 'log')
        return setupCollection({
          cName: 'FailableCollection',
          db: mockDb,
          state: mockState
        })
      })
      afterEach(() => {
        return mockDb.collection('FailableCollection').drop()
      })

      it('throws NamespaceExists err', async function(){
        await setupCollection({
          cName: 'FailableCollection',
          db: mockDb,
          state: mockState
        })
        expect(console.log).toHaveBeenLastCalledWith('DB: collection FailableCollection already setup')
      })

      it('throws to OTHER  err', async function(){
        const mockDB = {
          createCollection: () => {
            throw Error({codeName: 'HORSE'})
          }
        }
        await setupCollection({
          cName: 'FailableCollection',
          db: mockDB,
          state: mockState
        })
        expect(console.log).toHaveBeenLastCalledWith("DB ERROR: setupCollection for ", "FailableCollection")
      })
    })
  })
})