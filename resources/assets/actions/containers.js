import { createAction } from 'redux-actions';
import $ from 'jquery';

import * as types from '../constants/ActionTypes'


// export const fetchContainersIfNeeded = createAction(types.FETCH_CONTAINERS);


function requestContainers() {
  return {
    type: types.REQUEST_CONTAINERS
  }
}

function receiveContainers(json) {
  return {
    type: types.RECEIVE_CONTAINERS,
    containers: json.map(child => { return {name: child.name, description: child.description};})
  }
}

function fetchContainers() {
  return dispatch => {
    dispatch(requestContainers());
    $.get('/api/containers', function(data) {
    	dispatch(receiveContainers(data));
    });
  }
}

export function fetchContainersIfNeeded() {
  return (dispatch, getState) => {
      return dispatch(fetchContainers());
  }
}
