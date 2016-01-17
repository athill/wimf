import { createAction } from 'redux-actions';
import $ from 'jquery';

import types from '../constants/ActionTypes'


// export const fetchContainersIfNeeded = createAction(types.FETCH_CONTAINERS);


function requestContainers() {
  return {
    type: types.REQUEST_CONTAINERS
  }
}

function receiveContainers(json) {
  console.log('receiving containers', json);
  const items = json.map(child => { 
    return {
        name: child.name, 
        description: child.description,
        id: child.id
    };
  });
  return {
    type: types.RECEIVE_CONTAINERS,
    containers: {
      items,
      selected: items[0]      
    }
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
