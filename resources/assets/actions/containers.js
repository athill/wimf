import axios from 'axios';
import { createAction } from 'redux-actions';

import types from '../constants/ActionTypes'
import { fetchItems } from './items.js';


export function fetchContainers() {
  return dispatch => {
    dispatch(requestContainers());
    axios.get('/api/containers')
      .then(response => {
        console.log('receiveContainers then', response);
        dispatch(receiveContainers(response.data));
        dispatch(fetchItems(response.data[0]));
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
  console.log('processContainers', json)
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
};