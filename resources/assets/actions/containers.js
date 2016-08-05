import axios from 'axios';
import { createAction } from 'redux-actions';

import * as types from '../constants/ActionTypes'
import { fetchItems } from './items';
import { fetch } from '../util/RemoteOperations';


export function fetchContainers() {
  return dispatch => {
    dispatch(requestContainers());
    return fetch(
      '/api/containers',
      response => {
        dispatch(receiveContainers(response.data));
        dispatch(fetchItems(response.data[0]));
      }
    );
  };
}


export const add = item => {
  return (dispatch, getState) => {
    const state = getState();
    // const { containers: { selected: { id } }  } = getState();
    const container = state.containers.selected;
    item.container_id = container.id;
    item.date = getIsoFormat(item.date);
    dispatch(addItem());
    return post(
      `/api/items/`,
      item,
      response => {
        // dispatch(fetchItems(container));
        dispatch(addItemSuccess(response));
      },
      error => {
        dispatch(addItemError());
        dispatch(setItemFormError(error.data));
        setTimeout(() => dispatch(setItemFormError({error: []})), 3000);
      }
    );
  };
};

export const edit = item => {
  return (dispatch, getState) => {
    const state = getState();
    // const { containers: { selected: { id } }  } = getState();
    const container = state.containers.selected;
    item.container_id = container.id;
    item.date = getIsoFormat(item.date);
    dispatch(editItem());
    return put(
      `/api/items/${item.id}`,
      item,
      response => {
        // dispatch(fetchItems(container));
        dispatch(editItemSuccess(item));
      },
      error => {
        dispatch(editItemError());
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
        dispatch(deleteItemSuccess(item));
      },
      error => {
        console.error(error);
        dispatch(deleteItemError());
      }
    );
  };
};


const requestContainers = createAction(types.REQUEST_CONTAINERS);
const receiveContainers = createAction(types.RECEIVE_CONTAINERS, data => processContainers(data));

const addContainer = createAction(types.ADD_CONTAINER);
const addContainerSuccess = createAction(types.ADD_CONTAINER_SUCCESS);
const addContainerError = createAction(types.ADD_CONTAINER_ERROR);


const deleteContainer = createAction(types.DELETE_CONTAINER);
const deleteContainerSuccess = createAction(types.DELETE_CONTAINER_SUCCESS);
const deleteContainerError = createAction(types.DELETE_CONTAINER_ERROR);

const editContainer = createAction(types.EDIT_CONTAINER);
const editContainerSuccess = createAction(types.EDIT_CONTAINER_SUCCESS);
const editContainerError = createAction(types.EDIT_CONTAINER_ERROR);




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