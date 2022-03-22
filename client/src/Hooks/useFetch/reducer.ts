const SET_LOADING = 'SET_LOADING';
const SET_DATA = 'SET_DATA';
const SET_ERROR = 'SET_ERROR';
type BoolOrNull = boolean | null;
// TODO: update the ANY type
function fetchReducer(state: { 
  loading: BoolOrNull, 
  data: null, 
  error: null 
}, action: { 
  type: string, 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any 
}): void{
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
        error: null
      }
    case SET_ERROR: 
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload
      }
    default:
      throw new Error(`called fetchReducer with bad type: ${action.type}`)
  }
}

export default fetchReducer;
export { SET_LOADING, SET_DATA, SET_ERROR};
