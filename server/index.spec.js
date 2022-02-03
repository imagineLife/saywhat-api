const { startServer, stopServer } = require('./')
describe('Server index', () => {
  jest.mock('./helpers');
  const { twoAreEqual } = require('./helpers');

  describe('mocking twoAreEqual (jest mock test)', () => {
    twoAreEqual.mockImplementation(() => true)
    it('returns tru from (false,true)', () => {
      expect(twoAreEqual(false, true)).toBe(true)
    })
  })

  describe('startServer calls expressServer.listen', () => {
    it('calls server.listen with default port', () => {
      const mockListen = jest.fn();
      let mockServer = {
        listen: mockListen
      }
      startServer(mockServer)
      expect(mockListen).toHaveBeenCalledTimes(1)
    })
  })

  describe('stopServer calls expressServer.close', () => {
    it('calls server.listen with default port', () => {
      const mockCloseFn = jest.fn();
      let closeServerMock = {
        close: mockCloseFn
      }
      stopServer(closeServerMock)
      expect(mockCloseFn).toHaveBeenCalledTimes(1)
    })
  })
})