import { createAction } from 'redux-actions';
import { SubmissionError, reset } from 'redux-form';

import { hideItemForm, setItemFormError } from './itemForm';
import { hideContainerForm, setContainerFormError } from './containerForm';

//// utils
import { getIsoFormat } from '../../util/DateUtils';

import { get, post, deleteRequest, put } from '../../util/RemoteOperations';
import { addContainerToContainers, addItemToCategories, getSortedContainerArray, removeContainerFromContainers, removeItemFromCategories, 
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

export const ITEM_FORM_NAME = 'item';
export const CONTAINER_FORM_NAME = 'container';

//// reducer
export const initialState = {
  containers: [],
  selectedId: null,
  loading: false,
  filter: ''
};


const updateItemReducer = (state, action) => {
  let categories = state.containers[state.selectedId].categories;
  switch (action.type) {
    case ADD_ITEM_SUCCESS:
      categories = addItemToCategories(categories, action.payload.data);
      break;
    case EDIT_ITEM_SUCCESS:
      categories = updateItemInCategories(categories, action.payload.data);
      break;
    case DELETE_ITEM_SUCCESS:
      categories = removeItemFromCategories(categories, action.payload.data);
      break;
    default:
      console.error('How did I get here?');           
  }
  const containers = updateCategoriesInContainers(state.containers, state.selectedId, categories);
  return {
    ...state,
    containers
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
      //// determine new selected container id
      const containerArray = getSortedContainerArray(state.containers);
      //// find index of passed in container
      const index = containerArray.findIndex(x => x.id === action.payload.id);
      let selectedId = state.selectedId;
      //// if passed in container is same as selected container (which it probably is), adjust selectedId
      if (state.selectedId === index) {
        selectedId = index === 0 ? 1 : index - 1;
      }
      return {
        ...state,
        selectedId,
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
      const items = updateItemReducer(state, action); 
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

const addContainerRequest = createAction(ADD_CONTAINER);
const addContainerSuccess = createAction(ADD_CONTAINER_SUCCESS);
const addContainerError = createAction(ADD_CONTAINER_ERROR);


const deleteContainerRequest = createAction(DELETE_CONTAINER);
const deleteContainerSuccess = createAction(DELETE_CONTAINER_SUCCESS);
const deleteContainerError = createAction(DELETE_CONTAINER_ERROR);

const editContainerRequest = createAction(EDIT_CONTAINER);
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
export const fetchContainers = () => {
  return dispatch => {
    dispatch(requestContainers());
    return get(
      '/api/containers',
      response => {
        dispatch(receiveContainers(response.data));
        dispatch(fetchItems(response.data[0].id));
      }
    );
  };
}

export const addContainer = (container, resolve, reject) => {
  return (dispatch, getState) => {
    dispatch(addContainerRequest());
    return post(
      `/api/containers/`,
      container,
      response => {
        reset(CONTAINER_FORM_NAME);
        dispatch(addContainerSuccess(response));
        if (container.keepOpen) {
          //// TODO: not working
          dispatch(change(CONTAINER_FORM_NAME, 'keepOpen', true));
          const name = document.getElementById('name');
          name.focus();
        } else {
          dispatch(hideContainerForm());
        }        
        resolve();
      },
      error => {
        reject(error);
      }
    );
  };
};



export const editContainer = (container, resolve, reject) => {
  return (dispatch, getState) => {
    dispatch(editContainerRequest());
    return put(
      `/api/containers/${container.id}`,
      container,
      response => {
        reset(CONTAINER_FORM_NAME);
        dispatch(editContainerSuccess(container));
        dispatch(hideContainerForm());
        resolve();
      },
      error => {
        reject(error);
      }
    );
  };
};

export const removeContainer = (container, resolve, reject) => {
  return (dispatch, getState) => {
    dispatch(deleteContainerRequest());
    return deleteRequest(
      `/api/containers/${container.id}`,
      response => {
        reset(CONTAINER_FORM_NAME);
        dispatch(deleteContainerSuccess(container));
        dispatch(hideContainerForm());
        resolve();
      },
      error => {
        reject(error);
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
      get(
        `/api/containers/${containerId}`,
        response => {
          dispatch(receiveItems(response.data));
        }
      );
    }
  }
);

export const addItem = (item, resolve, reject) => {
  return (dispatch, getState) => {
    const state = getState();
    item.container_id = state.containers.selectedId;
    item.date = getIsoFormat(item.date);
    dispatch(addItemRequest());
    return post(
      `/api/items/`,
      item,
      response => {
        dispatch(addItemSuccess(response));
        reset(ITEM_FORM_NAME);
        if (item.keepOpen) {
          //// TODO: not working
          dispatch(change(ITEM_FORM_NAME, 'keepOpen', true));
          const category = document.getElementById('category');
          category.focus();
        } else {
          dispatch(hideItemForm());
        }
        resolve();
      },
      error => {
        reject(error);

      }
    );
  };
};

export const editItem = (item, resolve, reject) => {
  return (dispatch, getState) => {
    const state = getState();
    item.container_id = state.containers.selectedId;
    item.date = getIsoFormat(item.date);
    dispatch(editItemRequest());
    return put(
      `/api/items/${item.id}`,
      item,
      response => {
        reset(ITEM_FORM_NAME);
        dispatch(editItemSuccess(response));
        dispatch(hideItemForm());
        resolve();
      },
      error => {
        reject(error);
      }
    );
  };
};

export const removeItem = (item, resolve, reject) => {
  return (dispatch, getState) => {
    dispatch(deleteItemRequest());
    return deleteRequest(
      `/api/items/${item.id}`,
      response => {
        reset(ITEM_FORM_NAME);
        dispatch(deleteItemSuccess({ data: item }));
        dispatch(hideItemForm());
        resolve();
      },
      error => {
        reject(error);
      }
    );
  };
};