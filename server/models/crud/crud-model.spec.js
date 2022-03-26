const { Crud } = require('.');

describe('CRUD Model', () => {
  const Cat = new Crud({mongoClient:'asdf', db: 'qwer', collection:'poiu'})
  it('builds obj', () => {
    expect(JSON.stringify(Cat)).toBe(JSON.stringify({client:'asdf', db: 'qwer', collection: 'poiu'}))
  })

  it('createOne: returns string', () => {
    let testObj = { dog: 'horse' }
    let res = Cat.createOne(testObj)
    expect(res).toBe(`Creating One on poiu where ${JSON.stringify(testObj)}`)
  })
  it('read: returns string', () => {
    let testObj = { dog: 'horse' }
    let res = Cat.read(testObj)
    expect(res).toBe(`Getting on poiu where ${JSON.stringify(testObj)}`)
  })
  it('update: returns string', () => {
    let testObj = { dog: 'horse' }
    let res = Cat.update(testObj)
    expect(res).toBe(`Updating on poiu where ${JSON.stringify(testObj)}`)
  })
  it('read: returns string', () => {
    let testObj = { dog: 'horse' }
    let res = Cat.delete(testObj)
    expect(res).toBe(`deleting on poiu where ${JSON.stringify(testObj)}`)
  })
})