const defaultState = {
  errors: [],
  fetchingFails: false,
  isFetching: false,
};

export default function home(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_CORPORATE_DATA':
      return { ...state, isFetching: true };
    case 'FETCH_CORPORATE_DATA_SUCCEEDED':
      return {
        ...state,
        errors: [],
        fetchingFails: false,
        isFetching: false,
      };
    case 'FETCH_CORPORATE_DATA_FAILED':
      return {
        ...state,
        errors: action.errors,
        fetchingFails: true,
        isFetching: false,
      };
    case 'REMOVE_ERROR':
      if (action.reducerName !== 'home') return state;
      return { ...state, ...{ errors: state.errors.filter(error => error.id !== action.id) } };
    default:
      return state;
  }
}
