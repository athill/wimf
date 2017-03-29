import { createAction } from 'redux-actions';

import { setContainerFormError } from './containerForm';
import { fetchItems } from './items';

import { fetch, post, deleteRequest, put } from '../../util/RemoteOperations';
import { addContainerToContainers, updateContainerInContainers, removeContainerFromContainers } from '../../util/ContainerOperations';

//// actions
export const FETCH_CONTAINERS = 'FETCH_CONTAINERS';
export const REQUEST_CONTAINERS  = 'REQUEST_CONTAINERS';
export const RECEIVE_CONTAINERS = 'RECEIVE_CONTAINERS';
export const ADD_CONTAINER = 'ADD_CONTAINER';
export const ADD_CONTAINER_SUCCESS = 'ADD_CONTAINER_SUCCESS';
export const ADD_CONTAINER_ERROR  = 'ADD_CONTAINER_ERROR';
export const DELETE_CONTAINER = 'DELETE_CONTAINER';
export const DELETE_CONTAINER_SUCCESS = 'DELETE_CONTAINER_SUCCESS';
export const DELETE_CONTAINER_ERROR = 'DELETE_CONTAINER_ERROR';
export const EDIT_CONTAINER = 'EDIT_CONTAINER';
export const EDIT_CONTAINER_SUCCESS = 'EDIT_CONTAINER_SUCCESS';
export const EDIT_CONTAINER_ERROR = 'EDIT_CONTAINER_ERROR';
export const SELECT_CONTAINER = 'SELECT_CONTAINER';

//// reducer
export const initialState = {
  items: [],
  selected: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CONTAINERS:
      return action.payload;

    case ADD_CONTAINER_SUCCESS:
      return {
        ...state,
        items: addContainerToContainers(state.items, action.payload.data)
      };
    case EDIT_CONTAINER_SUCCESS:
      return {
        ...state,
        items: updateContainerInContainers(state.items, action.payload)
      };        
    case DELETE_CONTAINER_SUCCESS:
      return {
        ...state,
        items: removeContainerFromContainers(state.items, action.payload)
      };  
    case SELECT_CONTAINER:
      const selected = state.items.find(container => container.id === action.payload);
      return {
        ...state,
        selected:  selected || state.selected
      };           
    default:
      return state
  }
}

//// action creators
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
      selected: items[0]
  };
};

const requestContainers = createAction(REQUEST_CONTAINERS);
const receiveContainers = createAction(RECEIVE_CONTAINERS, data => processContainers(data));

const addContainer = createAction(ADD_CONTAINER);
const addContainerSuccess = createAction(ADD_CONTAINER_SUCCESS);
const addContainerError = createAction(ADD_CONTAINER_ERROR);


const deleteContainer = createAction(DELETE_CONTAINER);
const deleteContainerSuccess = createAction(DELETE_CONTAINER_SUCCESS);
const deleteContainerError = createAction(DELETE_CONTAINER_ERROR);

const editContainer = createAction(EDIT_CONTAINER);
const editContainerSuccess = createAction(EDIT_CONTAINER_SUCCESS);
const editContainerError = createAction(EDIT_CONTAINER_ERROR);

const selectContainer = createAction(SELECT_CONTAINER);


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
    dispatch(selectContainer(id));
    dispatch(fetchItems(id));
  };
}