const {
  makeConnectionString,
  connectDB,
  getAndListDBs
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
          let EXPECTED_STR = `mongodb://${mockProps.host}:${mockProps.port}`
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
  })
})