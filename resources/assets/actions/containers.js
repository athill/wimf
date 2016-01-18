import axios from 'axios';
import { createAction } from 'redux-actions';

import types from '../constants/ActionTypes'


export function fetchContainers() {
  return dispatch => {
    dispatch(requestContainers());
    axios.get('/api/containers')
      .then(response => {
        console.log('receiveContainers then', response);
        dispatch(receiveContainers(response.data));
      })
      .catch(response => {
        console.log('catching');
        console.log(response);
      });  
  }
}

const requestContainers = createAction(types.REQUEST_CONTAINERS);

const receiveContainers = createAction(types.RECEIVE_CONTAINERS, data => processContainers(data));


const processContainers = (json) => {
  console.log('processItems', json)
  const items = json.map(child => { 
    return {
          name: child.name, 
          description: child.description,
          id: child.id
      };
    });
  return {
      items,
      selected: items[0]
  };
}



// function fetchContainers() {
//   return dispatch => {
//     dispatch(requestContainers());
//     $.get('/api/containers', function(data) {
//     	dispatch(receiveContainers(data));
//     });
//   }
// }

export function fetchContainersIfNeeded() {
  return (dispatch, getState) => {
      return dispatch(fetchContainers());
  }
}
