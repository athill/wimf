import { createAction } from 'redux-actions';

import { get, post } from '../util/RemoteOperations';
import { getConstants } from './utils';

//// actions
export const REQUEST_USER_INFO = getConstants('REQUEST_USER_INFO');
export const REGISTER_USER = getConstants('REGISTER_USER');


//// reducer
export const initialState = {
  id: null,
  name: null,
  email: null
};

export default function reducer(state = initialState, action={}) {
  switch (action.type) {
    case REGISTER_USER.SUCCESS:
      return action.payload;    
    case REQUEST_USER_INFO.SUCCESS:
      return action.payload;
    default:
      return state
  }
};

export const register = values => {
  return dispatch => {
    dispatch(createAction(REGISTER_USER));
    post('/api/auth/register', 
      values, 
      response => dispatch(createAction(REGISTER_USER.SUCCESS)(response))
    );
  }
};

export function fetchUserInfo(container) {
  return dispatch => {
    dispatch(createAction(REQUEST_USER_INFO));
    get(
      `/api/user`,
      response => dispatch(createAction(REQUEST_USER_INFO.SUCCESS)(response.data))
    );  
  }
};