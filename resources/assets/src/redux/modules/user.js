import { createAction } from 'redux-actions';

import { fetch } from '../../util/RemoteOperations';

//// actions
export const REQUEST_USER_INFO = 'REQUEST_USER_INFO';
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO';


//// reducer
export const initialState = {
  id: null,
  name: null,
  email: null
};

export default function reducer(state = initialState, action={}) {
  switch (action.type) {
    case RECEIVE_USER_INFO:
    
      return action.payload;
    default:
      return state
  }
}

//// action creators
// import axios from 'axios';

export function fetchUserInfo(container) {
  return dispatch => {
    dispatch(requestUserInfo());
    fetch(
      `/api/currentUser`,
      response => dispatch(receiveUserInfo(response.data))
    );  
  }
}

const requestUserInfo = createAction(REQUEST_USER_INFO);

const receiveUserInfo = createAction(RECEIVE_USER_INFO);