import axios from 'axios';
import { createAction } from 'redux-actions';

import * as types from '../constants/ActionTypes'
import { fetchItems } from './items';
import { fetch, post, deleteRequest, put } from '../util/RemoteOperations';


export function fetchContainers() {
  return dispatch => {
    dispatch(requestContainers());
    return fetch(
      '/api/containers',
      response => {
        dispatch(receiveContainers(response.data));
        dispatch(fetchItems(response.data[0].id));
      }
    );
  };
}


export const add = container => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(addContainer());
    return post(
      `/api/containers/`,
      container,
      response => {
        dispatch(addContainerSuccess(response));
      },
      error => {
        dispatch(addContainerError());
        dispatch(setContainerFormError(error.data));
        setTimeout(() => dispatch(setContainerFormError({error: []})), 3000);
      }
    );
  };
};

export const edit = container => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(editContainer());
    return put(
      `/api/containers/${container.id}`,
      container,
      response => {
        dispatch(editContainerSuccess(container));
      },
      error => {
        dispatch(editContainerError());
        dispatch(setContainerFormError(error.data));
        setTimeout(() => dispatch(setContainerFormError({error: []})), 3000);
      }
    );
  };
};

export const remove = container => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(deleteContainer());
    return deleteRequest(
      `/api/containers/${container.id}`,
      response => {
        dispatch(deleteContainerSuccess(container));
      },
      error => {
        console.error(error);
        dispatch(deleteContainerError());
      }
    );
  };
};

export const select = id => {
  return (dispatch, getState) => {
    dispatch(selectContainer());
    dispatch(fetchItems(id));
  };
}


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

const selectContainer = createAction(types.SELECT_CONTAINER);


const processContainers = json => {
  const items = json.map(item => { 
    return {
          name: item.name, 
          description: item.description,
          id: item.id
      };
    });
  return {
      items,
      selected: items[0].id
  };
};