import React, { useState } from 'react';
import { mount } from 'enzyme';
import useFetch from ".";

/*
  Component with hook for testing
*/ 
const FetchUseComponent = (): void => {
  console.log('FETCH USE COMPONENT RENDER')
  
  const [url, setUrl] = useState(null);
  const { data, loading, error } = useFetch(url)
  console.log({
    data, 
    loading, 
    error,
    url
  })
  
  return(
    <div id="fetch-div">
      <button type="button" id="set-url" onClick={() => setUrl('water/melon')}>Click Me </button>
      <p id="url">{JSON.stringify(url)}</p>
      <p id="data">{JSON.stringify(data)}</p>
      <p id="loading">{JSON.stringify(loading)}</p>
      <p id="error">{JSON.stringify(error)}</p>
      </div>
  )
}

/*
    TESTS
*/ 
describe('useFetch', () => {
  describe('default vals', () => {
    const def = mount(<FetchUseComponent />)
    it('url === null', () => {
      expect(def.find('p#url').text()).toBe("null")
    })
    it('data === null', () => {
      expect(def.find('p#data').text()).toBe("null")
    })
    it('error === null', () => {
      expect(def.find('p#error').text()).toBe("null")
    })
    it('loading === null', () => {
      expect(def.find('p#loading').text()).toBe("null")
    })
  })
})