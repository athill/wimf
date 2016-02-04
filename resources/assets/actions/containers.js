import axios from 'axios';
import { createAction } from 'redux-actions';

import types from '../constants/ActionTypes'
import { fetchItems } from './items';
import { fetch } from '../util/RemoteOperations';


export function fetchContainers() {
  return dispatch => {
    dispatch(requestContainers());
    fetch(
      '/api/containers',
      response => {
        dispatch(receiveContainers(response.data));
        dispatch(fetchItems(response.data[0]));
      }
    );
  }
}

const requestContainers = createAction(types.REQUEST_CONTAINERS);

const receiveContainers = createAction(types.RECEIVE_CONTAINERS, data => processContainers(data));


const processContainers = json => {
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