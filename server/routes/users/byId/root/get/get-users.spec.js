const getUserById = require('./');
 
describe('Users:id - GET', () => { 
  it('returns expected res', () => { 
    const mockSend = jest.fn()
    const mockStatus = (n) => { 
      return {
        send: mockSend
      }
    } 
    const a = {};
    const b = {
      status: mockStatus,
      send: mockSend
    }
    const c = {}
    getUserById(a, b, c);
    expect(mockSend).toHaveBeenCalledTimes(1)
    expect(mockSend).toHaveBeenCalledWith('get user by id')
  })
})