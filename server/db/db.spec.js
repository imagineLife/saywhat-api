const {
  makeConnectionString,
  connectDB,
  getAndLogDBs,
  closeDBConnection
} = require('./')

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
        mockProps.port = 'gritz';
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
  describe('connectDB', () => {
    describe('logs error strings without expected connection param', () => {
      beforeEach(() => {
          delete process.env.MONGO_AUTH;
        })
        it('authDB', () => {
          jest.spyOn(global.console, 'log')
          const mockProps = {}
          mockProps.port = '27017';
          connectDB(mockProps)
          expect(console.log).toHaveBeenCalledWith('connectDB fn error:')
          expect(console.log).toHaveBeenCalledWith('Cannot create db connection with missing param')
        })
    })
    describe('Connects & returns list of dbs', () => {
      let mongoConnection;
      const testConnection = {
          host: 'localhost',
          port: '27017'
        }
      beforeEach(async function(){
        process.env.MONGO_AUTH = false;
        try{
          mongoConnection = await connectDB(testConnection);
        }catch(e){
          console.log('ERROR:');
          console.log(e);
        }
      });

      it('has internal state url matching connection params', () => {
        // https://github.com/mongodb/node-mongodb-native/blob/a766f1c/src/mongo_client.ts#L324
        expect(mongoConnection.s.url).toBe(`mongodb://${testConnection.host}:${testConnection.port}/?connectTimeoutMS=2500`)
      })

      it('returns list of dbs', async () => {
        jest.spyOn(global.console, 'table')
        await getAndLogDBs(mongoConnection)
        // including previous test & code log counts
        expect(console.table).toHaveBeenCalledTimes(1)
      })

      afterEach(async function(){
        if(mongoConnection){
          await closeDBConnection(mongoConnection);
        }
      });
    })
  })
})