const { Crud } = require('.');

describe('CRUD Model', () => {
  // describe('throws err', () => { 
  //   it('without mongoClient', () => { 
  //     expect(() => { 
  //       new Crud({ db: 'qwer', collection: 'horse'})
  //     }).toThrow('Cannot call Crud without client')
  //   })
  //   it('with mongoClient, without db', () => { 
  //     expect(() => { 
  //       new Crud({mongoClient: 'qwer', collection: 'horse'})
  //     }).toThrow('Cannot call Crud without db')
  //   })
  // })

  describe('works', () => { 
    let testDB;
    // beforeAll(() => {

    // })

    // afterAll(() => { 

    // })
    const mockCollFn = jest.fn()
    const mockDb = {
      collection: mockCollFn
    }
    const Cat = new Crud({ db: mockDb, collection: 'TestCollection' })
    
    const catKeys = Object.getOwnPropertyNames(Cat)
    const expectedKeys = ['connectionObj', 'db', 'collection']

    it('returns matching collection name from Model input', () => { 
      expect(Cat.collectionName).toBe('poiu')
    })

    describe('builds obj with expected keys', () => { 
      it.each(expectedKeys)(`%s`, (xKey) => { 
        expect(catKeys.includes(xKey)).toBe(true)
      })
    })

    let thisTestObj;

    describe('createOne', () => {
      let testObj = { dog: 'horse' }
      let createOneRes;
      it('returns obj with keys', async () => { 
        createOneRes = await Cat.createOne(testObj)
        console.log('createOneRes')
        console.log(createOneRes)
        expect(1).toBe(2)
      })
    })
    // it('read: returns string', () => {
    //   let testObj = { dog: 'horse' }
    //   let res = Cat.read(testObj)
    //   expect(res).toBe(`Getting on poiu where ${JSON.stringify(testObj)}`)
    // })
    // it('update: returns string', () => {
    //   let testObj = { dog: 'horse' }
    //   let res = Cat.update(testObj)
    //   expect(res).toBe(`Updating on poiu where ${JSON.stringify(testObj)}`)
    // })
    // it('read: returns string', () => {
    //   let testObj = { dog: 'horse' }
    //   let res = Cat.delete(testObj)
    //   expect(res).toBe(`deleting on poiu where ${JSON.stringify(testObj)}`)
    // })
  })
})