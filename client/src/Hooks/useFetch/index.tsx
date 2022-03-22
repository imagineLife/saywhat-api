import { useEffect, useReducer } from 'react';
import fetchReducer, { 
  SET_LOADING, 
  SET_DATA, 
  SET_ERROR
} from './reducer';

const initialFetchState = {
  data: null,
  loading: null,
  error: null
}

function useFetch(url): void {
  const [{data, loading, error}, dispatch] = useReducer(fetchReducer, initialFetchState);
  let fetchCancelled = false;
  useEffect(() => {
    async function getData(): void{
      try{
        const res = await fetch(url, { signal })
        console.log('res')
        console.log(res)
        
        const jsonRes = await res.json();
        console.log('jsonRes')
        console.log(jsonRes)
        
        if(!fetchCancelled){
          dispatch({type: SET_DATA, payload: jsonRes})
        }
      }catch(err){
        console.warn(`useFetch error on url ${url}`)
        console.log(err)
        dispatch({type: SET_ERROR, payload: err})
      }
    }

    if(url){
      dispatch({type: SET_LOADING });
      getData()
    }

    return () => {
      fetchCancelled = true;
    }

  }, [url])

  return { data, loading, error }
}

export default useFetch