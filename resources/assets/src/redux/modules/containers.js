import { createAction } from 'redux-actions';

import { setItemFormError } from './itemForm';
import { setContainerFormError } from './containerForm';

//// utils
import { getIsoFormat } from '../../util/DateUtils';

import { fetch, post, deleteRequest, put } from '../../util/RemoteOperations';
import { addContainerToContainers, addItemToCategories, removeContainerFromContainers, removeItemFromCategories, 
  sortCategories, updateItemInCategories, updateCategoriesInContainers, updateContainerInContainers } from '../../util/ContainerOperations';

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
//// items
export const FETCH_ITEMS = 'FETCH_ITEMS';
export const REQUEST_ITEMS  = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const ADD_ITEM = 'ADD_ITEM';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_ITEM_ERROR  = 'ADD_ITEM_ERROR';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const DELETE_ITEM_ERROR = 'DELETE_ITEM_ERROR';
export const EDIT_ITEM = 'EDIT_ITEM';
export const EDIT_ITEM_SUCCESS = 'EDIT_ITEM_SUCCESS';
export const EDIT_ITEM_ERROR = 'EDIT_ITEM_ERROR';
export const SET_ITEMS_FILTER = 'SET_ITEMS_FILTER';

//// reducer
export const initialState = {
  containers: [],
  selectedId: null,
  loading: false,
  filter: ''
};


const updateItems = (state, action) => {
  let categories;
  switch (action.type) {
    case ADD_ITEM_SUCCESS:
      categories = addItemToCategories(state.categories, action.payload.data);
      break;
    case EDIT_ITEM_SUCCESS:
      categories = updateItemInCategories(state.categories, action.payload.data);
      break;
    case DELETE_ITEM_SUCCESS:
      categories = removeItemFromCategories(state.categories, action.payload.data);
      break;
    default:
      console.error('How did I get here?');           
  }
  return {
    ...state,
    categories,
    containers: updateCategoriesInContainers(state.containers, action.payload.container_id, categories)
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CONTAINERS:
      return action.payload;

    case ADD_CONTAINER_SUCCESS:
      return {
        ...state,
        containers: addContainerToContainers(state.containers, action.payload.data)
      };
    case EDIT_CONTAINER_SUCCESS:
      return {
        ...state,
        containers: updateContainerInContainers(state.containers, action.payload)
      };        
    case DELETE_CONTAINER_SUCCESS:
      return {
        ...state,
        containers: removeContainerFromContainers(state.containers, action.payload)
      }; 

    case REQUEST_ITEMS:
      return {
        ...state,
        loading: true
      };
    case RECEIVE_ITEMS:
      let containers = Object.assign({}, state.containers);
      const container = action.payload;
      if (!('categories' in container)) {
        throw new Error('categories should exist in container (see fetchItems): ' + container.id);
      }
      const categories = container.categories;
      return {
        ...state,
        loading: false,
        containers: {
          ...containers,
          [container.id]: {
            ...container,
            categories
          }
        }
      };      
    case SELECT_CONTAINER:
      // const selected = state.containers.find(container => container.id === action.payload);
      return {
        ...state,
        selectedId:  action.payload || state.selectedId
      }; 
    case ADD_ITEM_SUCCESS:
    case DELETE_ITEM_SUCCESS:
    case EDIT_ITEM_SUCCESS:
      const items = updateItems(state, action); 
      return  items;
    case SET_ITEMS_FILTER:
      return {
        ...state,
        filter: action.payload
      };                 
    default:
      return state
  }
}


//// action creators
const processContainers = json => {
  const containers = {};
  json.forEach(container => containers[container.id] = container );
  return {
      containers,
      selectedId: json[0].id+''
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

//// items
const requestItems = createAction(REQUEST_ITEMS);
const receiveItems = createAction(RECEIVE_ITEMS);

export const addItemRequest = createAction(ADD_ITEM);
const addItemSuccess = createAction(ADD_ITEM_SUCCESS);
const addItemError = createAction(ADD_ITEM_ERROR);


const deleteItemRequest = createAction(DELETE_ITEM);
const deleteItemSuccess = createAction(DELETE_ITEM_SUCCESS);
const deleteItemError = createAction(DELETE_ITEM_ERROR);

const editItemRequest = createAction(EDIT_ITEM);
const editItemSuccess = createAction(EDIT_ITEM_SUCCESS);
const editItemError = createAction(EDIT_ITEM_ERROR);

export const setItemsFilter = createAction(SET_ITEMS_FILTER);

//// containers
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
};



export const fetchItems = containerId => (
  (dispatch, getState) => {
    const { containers} = getState();
    if ('categories' in containers.containers[containerId]) {
      dispatch(receiveItems(containers.containers[containerId]));
    } else {
      dispatch(requestItems());
      fetch(
        `/api/containers/${containerId}`,
        response => {
          dispatch(receiveItems(response.data));
        }
      );
    }
  }
);

export const addItem = item => {
  return (dispatch, getState) => {
    const state = getState();

    // const { containers: { selected: { id } }  } = getState();
    const container = state.containers[state.containers.selected];
    item.container_id = container.id;
    item.date = getIsoFormat(item.date);
    dispatch(addItemRequest());
    return post(
      `/api/items/`,
      item,
      response => {
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

export const editItem = item => {
  return (dispatch, getState) => {
    const state = getState();
    // const { containers: { selected: { id } }  } = getState();
    const container = state.containers[state.containers.selected];
    item.container_id = container.id;
    item.date = getIsoFormat(item.date);
    dispatch(editItemRequest());
    return put(
      `/api/items/${item.id}`,
      item,
      response => {
        // dispatch(fetchItems(container));
        dispatch(editItemSuccess(response));
      },
      error => {
        dispatch(editItemError());
        dispatch(setItemFormError(error.data));
        setTimeout(() => dispatch(setItemFormError({error: []})), 3000);
      }
    );
  };
};

export const removeItem = item => {
  return (dispatch, getState) => {
    const state = getState();
    const container = state.containers.selected;
    item.container_id = container.id;
    dispatch(deleteItemRequest());
    return deleteRequest(
      `/api/items/${item.id}`,
      response => {
        dispatch(deleteItemSuccess({ data: item }));
      },
      error => {
        console.error(error);
        dispatch(deleteItemError());
      }
    );
  };
};