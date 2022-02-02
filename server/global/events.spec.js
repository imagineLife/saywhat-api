const { ServicesEmitter} = require('./events');
const GLOBAL_STATE = require('./state');
describe('ServicesEmitter: ORDERED', () => {
  it('default GLOBAL_STATE val is fals', () => {
    expect(GLOBAL_STATE.DB_CONNECTED).toBe(false)
  })
  it('connect updates global_state var', () => {
    ServicesEmitter.emit('DB_CONNECT', true)
    expect(GLOBAL_STATE.DB_CONNECTED).toBe(true)
  })
  it('connect updates global_state var', () => {
    ServicesEmitter.emit('DB_DISCONNECT', false)
    expect(GLOBAL_STATE.DB_CONNECTED).toBe(false)
  })
})