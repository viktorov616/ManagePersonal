import { deleteCookie, getCookie, saveCookie } from '../utility/cookies';

const username = getCookie('username') || '';
const role = getCookie('role') || '';
const authorized = !!(username && role);
const defaultState = {
  authorized,
  role,
  username,
};

export default function user(state = defaultState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCEEDED':
      saveCookie('username', action.user.username);
      saveCookie('role', action.user.role);
      return {
        ...state,
        ...action.user,
        ...{ authorized: true },
      };
    case 'LOGOUT':
      deleteCookie('username', state.username);
      deleteCookie('role', state.role);
      return {
        ...state,
        authorized: false,
        role: '',
        username: '',
      };
    default:
      return state;
  }
}
