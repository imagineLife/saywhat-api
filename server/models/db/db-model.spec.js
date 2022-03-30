const { DB } = require('.');
const { MongoClient } = require('mongodb');

describe('DB Model', () => {
  describe('connect method', () => {
    describe('logs error strings without expected connection param', () => {
      beforeEach(() => {
          delete process.env.MONGO_AUTH;
        })
        it('authDB', () => {
          jest.spyOn(global.console, 'log')
          const MockDB = new DB({
            connectionObj: {
              host: 'localhost',
              // port: '27017'
            }, db: 'TestSayWhat'
          })
          MockDB.connect()
          expect(console.log).toHaveBeenCalledWith('Cannot create db connection with missing param')
        })
    })
    describe('methods', () => {
      let MockDB = new DB({
        connectionObj: {
          host: 'localhost',
          port: '27017'
        }
      })
      
      beforeAll(() => {
        jest.spyOn(global.console, 'table')
      })
      
      beforeEach(function(){
        process.env.MONGO_AUTH = false;
      });

      it('calls DB.connect', async () => {
        
        const connectSpy = jest.spyOn(MockDB, 'connect');
        
        await MockDB.connect();
        expect(connectSpy).toHaveBeenCalledTimes(1);
      });

      it('gets and logs dbs', async () => { 
        let dbs = await MockDB.getAndLogDBs()
        expect(console.table).toHaveBeenCalledTimes(1)
      })

      it('calls DB.close', async () => {
        const closeSpy = jest.spyOn(MockDB, 'close');
        await MockDB.close();
        expect(closeSpy).toHaveBeenCalledTimes(1);
      });

      describe('registerDB', () => {
        let WillFail = null;
        let WillPass = null;
        afterEach(async () => { 
          if (WillFail && WillFail.client) { 
            await WillFail.close()
          }
          if (WillPass) { 
            await WillPass.close()
          }
        })

        it('succeeds, returning db', async () => { 
          WillPass = new DB({
            connectionObj: {
              host: 'localhost',
              port: 27017
            }
          })
          const TEST_DB_STRING = 'TestDBObject'
          await WillPass.connect('TestDBHere');
          let testDB = WillPass.registerDB(TEST_DB_STRING)
          expect(testDB.s.namespace.db).toBe(TEST_DB_STRING)
        })

        describe('throws', () => { 
          
          it('without registering a client', () => {
            WillFail = new DB({
              connectionObj: {
                host: 'localhost',
                port: 27017
              }
            })
            expect(() => { 
              WillFail.registerDB('FailingDB')
            }).toThrow("attempted to registerDB without building a client: use setupDB or \"new DB()\" to connect to a mongo instance")
          })


          it('without passing db string', async () => {
            WillFail = new DB({
              connectionObj: {
                host: 'localhost',
                port: 27017
              }
            })
            await WillFail.connect();
            expect(() => { 
              WillFail.registerDB()
            }).toThrow('missing db name string param')
          })
        })
      })
    })
  })

})