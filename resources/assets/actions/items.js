import axios from 'axios';
import { createAction } from 'redux-actions';

import types from '../constants/ActionTypes'
import { setAddFormError } from './addForm';
import { fetch, post } from '../util/RemoteOperations';


export function fetchItems(container) {
  return dispatch => {
    dispatch(requestItems());
    fetch(
      `/api/containers/${container.id}`,
      response => {
        console.log('fetchItems response', response);
        dispatch(receiveItems(response.data))
      }
    );
  }
}

export const add = item => {
  return (dispatch, getState) => {
    const state = getState();
    // const { containers: { selected: { id } }  } = getState();
    const container = state.containers.selected;
    item.container_id = container.id;
    post(
      `/api/items/`,
      item,
      [
        response => dispatch(addItem()), 
        response => dispatch(fetchItems(container))
      ],
      response => {
        dispatch(setAddFormError(response.data));
        setTimeout(() => dispatch(setAddFormError({error: ''})), 3000);
      }
    );
  }
};


const requestItems = createAction(types.REQUEST_ITEMS);

const receiveItems = createAction(types.RECEIVE_ITEMS, data => processItems(data));

const addItem = createAction(types.ADD_ITEM);

const clearForm = createAction(types.CLEAR_ADD_FORM);


const processItems = (json) => {
  return json;
}
