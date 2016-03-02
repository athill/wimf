import axios from 'axios';
import { createAction } from 'redux-actions';

import * as types from '../constants/ActionTypes'
import { setItemFormError } from './itemForm';
import { fetch, post, deleteRequest } from '../util/RemoteOperations';
import { addItemToContainer, removeItemFromContainer } from '../util/ContainerOperations';


export const fetchItems = container => (
  dispatch => {
    dispatch(requestItems());
    fetch(
      `/api/containers/${container.id}`,
      response => {
        dispatch(receiveItems(response.data));
      }
    );
  }
);

export const add = item => {
  return (dispatch, getState) => {
    const state = getState();
    // const { containers: { selected: { id } }  } = getState();
    const container = state.containers.selected;
    item.container_id = container.id;
    dispatch(addItem());
    return post(
      `/api/items/`,
      item,
      response => {
        dispatch(fetchItems(container));
        dispatch(addItemSuccess());
      },
      error => {
        dispatch(addItemError());
        dispatch(setItemFormError(error.data));
        setTimeout(() => dispatch(setItemFormError({error: []})), 3000);
      }
    );
  };
};

export const remove = item => {
  return (dispatch, getState) => {
    const state = getState();
    // const { containers: { selected: { id } }  } = getState();
    const container = state.containers.selected;
    item.container_id = container.id;
    dispatch(deleteItem());
    return deleteRequest(
      `/api/items/${item.id}`,
      response => {
        removeItemFromContainer(item);
        dispatch(deleteItemSuccess());
      },
      error => {
        console.error(error);
        dispatch(deleteItemError());
      }
    );
  };
};


const requestItems = createAction(types.REQUEST_ITEMS);
const receiveItems = createAction(types.RECEIVE_ITEMS, data => processItems(data));

const addItem = createAction(types.ADD_ITEM);
const addItemSuccess = createAction(types.ADD_ITEM_ERROR);
const addItemError = createAction(types.ADD_ITEM_ERROR);


const deleteItem = createAction(types.DELETE_ITEM);
const deleteItemSuccess = createAction(types.DELETE_ITEM_SUCCESS);
const deleteItemError = createAction(types.DELETE_ITEM_ERROR);


const processItems = (json) => {
  return json;
}
