import { createAction } from 'redux-actions';

import { get } from '../../util/RemoteOperations';

//// actions
import { getConstants } from './utils';
export const REQUEST_USER_INFO = getConstants('REQUEST_USER_INFO');


//// reducer
export const initialState = {
  id: null,
  name: null,
  email: null
};

export default function reducer(state = initialState, action={}) {
  switch (action.type) {
    case REQUEST_USER_INFO.SUCCESS:
      return action.payload;
    default:
      return state
  }
};

export function fetchUserInfo(container) {
  return dispatch => {
    dispatch(createAction(REQUEST_USER_INFO));
    get(
      `/api/currentUser`,
      response => dispatch(createAction(REQUEST_USER_INFO.SUCCESS)(response.data))
    );  
  }
};