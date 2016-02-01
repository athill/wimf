import axios from 'axios';
import { createAction } from 'redux-actions';

import types from '../constants/ActionTypes'
import { setAddForm } from './addForm';


export function fetchItems(container) {
  return dispatch => {
    dispatch(requestItems());
    axios.get(`/api/containers/${container.id}`)
      .then(response => {
        dispatch(receiveItems(response.data));
      })
      .catch(response => {
        console.error(response);
      });  
  }
}

export const add = item => {
  return (dispatch, getState) => {
    const state = getState();
    const container = state.containers.selected;
    item.container_id = container.id;
      axios({
        method: 'post',
        url: `/api/items/`,
        data: item
      })    
      .then(response => {
        dispatch(addItem());
      })
      .then(response => {
        dispatch(fetchItems(container));
      })
      .catch(response => {
        // dispatch(setAddForm(response.error));
        console.error(response);
      });  
  }
};

const requestItems = createAction(types.REQUEST_ITEMS);

const receiveItems = createAction(types.RECEIVE_ITEMS, data => processItems(data));

const addItem = createAction(types.ADD_ITEM);

const clearForm = createAction(types.CLEAR_ADD_FORM);


const processItems = (json) => {
  return json;
}
