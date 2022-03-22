import r, { 
  SET_LOADING, 
  SET_DATA, 
  SET_ERROR
}  from './reducer';

describe('fetchReducer', () => {
  it('SET_LOADING', () => {
    const res = r({},{type: SET_LOADING});
    expect(res.loading).toBe(true)
    expect(res.data).toBe(null)
    expect(res.error).toBe(null)
  })
  it('SET_ERROR', () => {
    const res = r({},{type: SET_ERROR, payload: 'horse'});
    expect(res.error).toBe('horse')
    expect(res.data).toBe(null)
    expect(res.loading).toBe(false)
  })
  it('SET_DATA', () => {
    const res = r({},{type: SET_DATA, payload: 'horse'});
    expect(res.data).toBe('horse')
    expect(res.error).toBe(null)
    expect(res.loading).toBe(false)
  })
  it('BAD_TYPE', () => {
    expect(() => {
      r({},{type: 'BAD_TYPE', payload: 'horse'})
    }).toThrowError(`called fetchReducer with bad type: BAD_TYPE`)
  })
})