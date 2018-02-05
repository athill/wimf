import { createAction } from 'redux-actions';
import history from '../history';
import { get, post } from '../util/RemoteOperations';
import { getConstants, loadingStates } from './utils';

//// actions
export const REQUEST_USER_INFO = getConstants('REQUEST_USER_INFO');
export const REGISTER_USER = getConstants('REGISTER_USER');
export const LOGIN_USER = getConstants('LOGIN_USER');
export const LOGOUT_USER = getConstants('LOGOUT_USER');


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
      console.log(action);
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
 return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(createAction(LOGIN_USER.ACTION));
      post('/api/login', 
        values, 
        response => dispatch(createAction(LOGIN_USER.SUCCESS)(response.data))
      ).then(response => {
        dispatch(fetchUserInfo());
      })
      .then(response => history.push('/'))
      .catch(error => reject(error));
    })

  };
};

export const logout = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(createAction(LOGOUT_USER.SUCCESS)());
      history.push('/login');
    });
  }
};

export const register = values => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(createAction(REGISTER_USER.ACTION));
      post('/api/register', 
        values, 
          response => dispatch(createAction(REGISTER_USER.SUCCESS)(response.data)))
      .then(response => dispatch(login(values)))
      .catch(error => reject(error));
    });
  }
};

export function fetchUserInfo() {
  return dispatch => {
    dispatch(createAction(REQUEST_USER_INFO.ACTION));
    get(
      `/api/me`,
      response => dispatch(createAction(REQUEST_USER_INFO.SUCCESS)(response.data))
    )
    .catch(error => console.log('fetchUserInfo error', error))  
  }
};