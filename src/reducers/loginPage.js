const defaultState = {
  errors: [],
  isFetching: false,
};

export default function loginPage(state = defaultState, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isFetching: true };
    case 'LOGIN_SUCCEEDED':
      return { ...state, errors: [], isFetching: false };
    case 'LOGIN_FAILED':
      return { ...state, errors: action.errors, isFetching: false };
    case 'REMOVE_ERROR':
      if (action.reducerName !== 'loginPage') return state;
      return { ...state, errors: state.errors.filter(error => error.id !== action.id) };
    default:
      return state;
  }
}
