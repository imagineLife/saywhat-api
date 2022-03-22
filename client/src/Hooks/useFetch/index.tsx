import { useEffect, useReducer } from 'react';
import fetchReducer, { 
  SET_LOADING, 
  SET_DATA, 
  SET_ERROR,
  FetchReducerStateType
} from './reducer';

const initialFetchState = {
  data: false,
  loading: false,
  error: false
}


  
function useFetch(url: string): FetchReducerStateType {
  const [{data, loading, error}, dispatch] = useReducer(fetchReducer, initialFetchState);
  let fetchCancelled = false;
  useEffect(() => {
    // declaring the async fn
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getData = async (urlParam: string, cancelled: boolean): Promise<any> => {
      try{
        const res = await fetch(urlParam)
        const jsonRes = await res.json();
        if(!cancelled){
          dispatch({type: SET_DATA, payload: jsonRes})
        }
      }catch(err){
        console.warn(`useFetch error on url ${urlParam}`)
        console.log(err.message)
        dispatch({type: SET_ERROR, payload: 'api error'})
      }
    }


    if(url){
      dispatch({type: SET_LOADING });
      getData(url, fetchCancelled)
    }

    return () => {
      fetchCancelled = true;
    }

  }, [url])

  return { data, loading, error }
}

export default useFetch