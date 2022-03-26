const { DB } = require('.');

describe('DB Model', () => { })
  it('sets client and db from constructor props', () => {
    const Horse = new DB({mongoClient:'asdf', db: 'qwer'})
    expect(JSON.stringify(Horse)).toBe(JSON.stringify({client:'asdf', db: 'qwer'}))
})