const SET_LOADING = 'SET_LOADING';
const SET_DATA = 'SET_DATA';
const SET_ERROR = 'SET_ERROR';
type BoolOrNull = boolean | null;

type FetchReducerStateType = {
  data: boolean | string,
  loading: boolean,
  error: boolean | string
}

// type StringOrNull = string | null;
// TODO: update the ANY type
function fetchReducer(state: FetchReducerStateType, action: {
  type: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: boolean | string
}): FetchReducerStateType {
  switch(action.type){
    case SET_LOADING: 
      return {
        ...state,
        loading: true,
        data: false,
        error: false
      }
    case SET_DATA:
      return {
        ...state,
        loading: false,
        data: action?.payload,
        error: false
      }
    case SET_ERROR: 
      return {
        ...state,
        loading: false,
        data: false,
        error: action.payload
      }
    default:
      throw new Error(`called fetchReducer with bad type: ${action.type}`)
  }
}

export default fetchReducer;
export { SET_LOADING, SET_DATA, SET_ERROR, FetchReducerStateType};
