
// import '@types/jest';
import React, { useState } from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils'
import useFetch from ".";
import { updateComponentWithAct } from "../../helpers"
import * as fetchReducer from './reducer'

function setupFetchStub(data) {
  return function fetchStub(_url) {
    return new Promise((resolve) => {
      resolve({
        json: () =>
          Promise.resolve({ data }),
      })
    })
  }
}


/*
  Component with hook for testing
*/ 
const FetchUseComponent = (): JSX.Element => {
  const [url, setUrl] = useState(null);
  const { data, loading, error } = useFetch(url)
  
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
    it('data === false', () => {
      expect(def.find('p#data').text()).toBe("false")
    })
    it('error === false', () => {
      expect(def.find('p#error').text()).toBe("false")
    })
    it('loading === false', () => {
      expect(def.find('p#loading').text()).toBe("false")
    })
  })

  describe('calls dispatch when url is present', () => { 
    beforeAll(() => {
      jest.spyOn(fetchReducer, 'default')
      jest.spyOn(global, "fetch").mockImplementationOnce(setupFetchStub({'juice': 'box'}))
    })

    const thisC = mount(<FetchUseComponent />)
    it('url === null', () => {
      expect(thisC.find('p#url').text()).toBe("null")
    })

    it('clicks, && triggers dispatches', async () => { 
      await act(async () => {
         thisC.find('#set-url').simulate('click');
        await Promise.resolve(thisC);
        // eslint-disable-next-line no-promise-executor-return
        await  Promise.resolve({})
        thisC.update();
      });

      expect(thisC.find('p#url').text()).toBe("\"water/melon\"")
      expect(fetchReducer.default).toHaveBeenCalledTimes(2)
      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(global.fetch).toHaveBeenCalledWith('water/melon')
    })
  })

  describe('dispatches error with bad fetch reply', () => { 
    const errorComponent = mount(<FetchUseComponent />)
    it('dispatches error', async () => { 
      jest.spyOn(global, "fetch").mockImplementationOnce(() => 'water')

      await act(async () => {
        errorComponent.find('#set-url').simulate('click');
        await Promise.resolve(errorComponent);
        // eslint-disable-next-line no-promise-executor-return
        await  Promise.resolve({})
        errorComponent.update();
      });
      
      updateComponentWithAct(errorComponent)
      expect(fetchReducer.default).toHaveBeenCalledTimes(4)
      expect(fetchReducer.default).toHaveBeenLastCalledWith({"data": false, "error": false, "loading": true}, {"payload": "api error", "type": "SET_ERROR"})
    })
  })
})
