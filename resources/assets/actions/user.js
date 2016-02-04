import axios from 'axios';
import { createAction } from 'redux-actions';

import types from '../constants/ActionTypes';
import { fetch } from '../util/RemoteOperations';


export function fetchUserInfo(container) {
  return dispatch => {
    dispatch(requestUserInfo());
    fetch(
      `/api/currentUser`,
      response => dispatch(receiveUserInfo(response.data))
    );  
  }
}

const requestUserInfo = createAction(types.REQUEST_USER_INFO);

const receiveUserInfo = createAction(types.RECEIVE_USER_INFO);