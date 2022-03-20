import { useEffect, useReducer } from 'react';

const controller = new AbortController();
const { signal } = controller;

const SET_LOADING = 'SET_LOADING';
const SET_DATA = 'SET_DATA';

type BoolOrNull = boolean | null;
// TODO: update the ANY type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fetchReducer(state: { loading: BoolOrNull, data: null, error: null }, action: { type: string, payload?: any }): void{
  switch(action.type){
    case SET_LOADING: 
      return {
        ...state,
        loading: true,
        data: null,
        error: null
      }
    case SET_DATA:
      return {
        ...state,
        loading: false,
        data: action?.payload,
        error: false
      }
    default:
      throw new Error(`called fetchReducer with bad type: ${action.type}`)
  }
}

const initialFetchState = {
  data: null,
  loading: null,
  error: null
}

function useFetch(url): void {
  if(!url){
    throw new Error(`useFetch requires a url`)
  }
  
  const [{data, loading, error}, dispatch] = useReducer(fetchReducer, initialFetchState);

  useEffect(() => {
      dispatch({type: SET_LOADING });
      async function getData(): void{
        try{
          const res = await fetch(url, { signal })
          const jsonRes = res.json();
          dispatch({type: SET_DATA, payload: jsonRes})
        }catch(err){
          throw new Error(`useFetch error on url ${url}`)
          dispatch({type: SET_ERROR, payload: err})
        }
      }
      getData()
      return () => {
        controller.abort()
      }
  }, [url])

  return { data, loading, error }
}

export default useFetch