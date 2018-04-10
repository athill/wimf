import { createAction } from 'redux-actions';
import history from '../history';
import { get, post } from '../util/RemoteOperations';
import { getConstants, loadingStates } from './utils';

//// actions
export const REQUEST_USER_INFO = getConstants('REQUEST_USER_INFO');
export const REGISTER_USER = getConstants('REGISTER_USER');
export const LOGIN_USER = getConstants('LOGIN_USER');
export const LOGOUT_USER = getConstants('LOGOUT_USER');
export const PASSWORD_RESET = getConstants('PASSWORD_RESET');


//// reducer
export const initialState = {
  id: null,
  name: null,
  email: null,
  authenticated: !!sessionStorage.getItem('token'),
  loading: loadingStates.CLEAN,
};

export default function reducer(state = initialState, action={}) {
  switch (action.type) {
    case LOGIN_USER.SUCCESS:
      if (action.payload.remember) {
        localStorage.setItem('token', action.payload.access_token);
      }
      sessionStorage.setItem('token', action.payload.access_token);
      return {
        ...state,
        authenticated: true
      };
    case LOGOUT_USER.SUCCESS:
      sessionStorage.removeItem('token');
      localStorage.removeItem('token');
      return {
        ...initialState,
        authenticated: false
      };   
    case REQUEST_USER_INFO.ACTION:
      return {
        ...state,
        loading: loadingStates.LOADING
      };
    case REQUEST_USER_INFO.SUCCESS:
      const newState = {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        loading: loadingStates.COMPLETE,
        authenticated: true
      };
      return newState;
    default:
      return state;
  }
};

export const login = values => {
 return async dispatch => {
    try {
      dispatch(createAction(LOGIN_USER.ACTION));
      const response = await post('/api/login', 
        values, 
        response => dispatch(createAction(LOGIN_USER.SUCCESS)(response.data))
      );
      dispatch(fetchUserInfo());
      history.push('/');
    } catch (error) {
      throw error;
    }
  }
};

export const logout = () => {
  return dispatch => {
    dispatch(createAction(LOGOUT_USER.SUCCESS)());
    history.push('/login');
  }
};

export const register = values => {
  return async dispatch => {
    try {
      dispatch(createAction(REGISTER_USER.ACTION));
      const response = await post('/api/register', 
        values, 
          response => dispatch(createAction(REGISTER_USER.SUCCESS)(response.data)));

      dispatch(login(values))
    } catch (error) {
      throw error;
    }
  }
};

export const passwordReset = values => {
  return async dispatch => {
    try {
      dispatch(createAction(PASSWORD_RESET.ACTION));
      const response = await post('/api/password/reset', 
        values, 
          response => dispatch(createAction(PASSWORD_RESET.SUCCESS)(response.data)));

      // dispatch(login(values))
    } catch (error) {
      throw error;
    }
  }
};

export function fetchUserInfo() {
  return async dispatch => {
    dispatch(createAction(REQUEST_USER_INFO.ACTION));
    return await get(
      `/api/me`,
      response => dispatch(createAction(REQUEST_USER_INFO.SUCCESS)(response.data))
    )
  }
};
