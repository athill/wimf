import { createAction } from 'redux-actions';

import history from '../history';
import { get, post } from '../util/RemoteOperations';
import { getConstants } from './utils';

//// actions
export const REQUEST_USER_INFO = getConstants('REQUEST_USER_INFO');
export const REGISTER_USER = getConstants('REGISTER_USER');
export const LOGIN_USER = getConstants('LOGIN_USER');


//// reducer
export const initialState = {
  id: null,
  name: null,
  email: null
};

export default function reducer(state = initialState, action={}) {
  switch (action.type) {
    case LOGIN_USER.SUCCESS:
      console.log(action);
      sessionStorage.setItem('token', action.payload.token);
      return state;

    case REGISTER_USER.SUCCESS:
      return state;    
    case REQUEST_USER_INFO.SUCCESS:
      const newState = {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
      };
      return newState;
    default:
      return state;
  }
};

export const login = values => {
 return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(createAction(LOGIN_USER));
      post('/api/auth/login', 
        values, 
        response => dispatch(createAction(LOGIN_USER.SUCCESS)(response.data))
      ).then(response => {
        dispatch(fetchUserInfo());
      })
      .then(response => history.push('/'))
      .catch(error => {
        console.log('in login catch', error);
        reject(error)
      });
    })

  };
};

export const register = values => {
  return dispatch => {
    dispatch(createAction(REGISTER_USER));
    return post('/api/auth/register', 
      values, 
      [
        response => dispatch(createAction(REGISTER_USER.SUCCESS)(response)),
        response => login(values)

      ]
    );
  }
};

export function fetchUserInfo() {
  return dispatch => {
    dispatch(createAction(REQUEST_USER_INFO));
    get(
      `/api/user`,
      response => dispatch(createAction(REQUEST_USER_INFO.SUCCESS)(response.data.result))
    );  
  }
};