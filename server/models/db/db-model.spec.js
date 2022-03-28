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
        }, dbName: 'TestSayWhat'
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
        console.log('dbs')
        console.log(dbs)
        expect(console.table).toHaveBeenCalledTimes(1)
      })

      it('calls DB.close', async () => {
        const closeSpy = jest.spyOn(MockDB, 'close');
        await MockDB.close();
        expect(closeSpy).toHaveBeenCalledTimes(1);
      });
    })
  })

})