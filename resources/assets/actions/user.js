import axios from 'axios';
import { createAction } from 'redux-actions';

import types from '../constants/ActionTypes'


export function fetchUserInfo(container) {
  return dispatch => {
    dispatch(requestUserInfo());
    axios.get(`/api/currentUser`)
      .then(response => {
        dispatch(receiveUserInfo(response.data));
      })
      .catch(response => {
        console.error(response);
      });  
  }
}

const requestUserInfo = createAction(types.REQUEST_USER_INFO);

const receiveUserInfo = createAction(types.RECEIVE_USER_INFO);