const ServicesEmitter = require('./events');
const GLOBAL_STATE = require('./state');
describe('ServicesEmitter: ORDERED', () => {
  it('default GLOBAL_STATE val is fals', () => {
    expect(GLOBAL_STATE.DB_CONNECTED).toBe(false)
  })
  it('connect updates global_state var', () => {
    ServicesEmitter.emit('DB_CONNECT')
    expect(GLOBAL_STATE.DB_CONNECTED).toBe(true)
  })
  it('connect updates global_state var', () => {
    ServicesEmitter.emit('DB_DISCONNECT')
    expect(GLOBAL_STATE.DB_CONNECTED).toBe(false)
  })
})