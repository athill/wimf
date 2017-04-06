import { createAction } from 'redux-actions';

import { setItemFormError } from './itemForm';

//// utils
import { getIsoFormat } from '../../util/DateUtils';
import { fetch, post, deleteRequest, put } from '../../util/RemoteOperations';

import { sortCategories, addItemToCategories, removeItemFromCategories,
  updateItemInCategories, updateCategoriesInContainers } from '../../util/ContainerOperations';

//// constants
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
    containers: {},
    categories: [],
    name: '',
    id: 0,
    description: '',
    filter: '',
    loading: true
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
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ITEMS:
      return {
        ...state,
        loading: true
      };
    case RECEIVE_ITEMS:
      let containers = state.containers;
      if (!containers[action.payload.id]) { 
        containers = {
          ...containers,
          [action.payload.id]: action.payload
        };
      }
      return {
        ...state,
        containers,
        loading: false,
        name: action.payload.name,
        id: action.payload.id,
        description: action.payload.description,
        categories: sortCategories(action.payload.categories)
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
      return state;
  }
}


//// action creators
const processItems = (json) => {
  return json;
}

const requestItems = createAction(REQUEST_ITEMS);
const receiveItems = createAction(RECEIVE_ITEMS, data => processItems(data));

export const addItem = createAction(ADD_ITEM);
const addItemSuccess = createAction(ADD_ITEM_SUCCESS);
const addItemError = createAction(ADD_ITEM_ERROR);


const deleteItem = createAction(DELETE_ITEM);
const deleteItemSuccess = createAction(DELETE_ITEM_SUCCESS);
const deleteItemError = createAction(DELETE_ITEM_ERROR);

const editItem = createAction(EDIT_ITEM);
const editItemSuccess = createAction(EDIT_ITEM_SUCCESS);
const editItemError = createAction(EDIT_ITEM_ERROR);

export const setItemsFilter = createAction(SET_ITEMS_FILTER);



export const fetchItems = containerId => (
  (dispatch, getState) => {
    const { items } = getState();
    if (containerId in items.containers) {
      dispatch(receiveItems(items.containers[containerId]));
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

export const remove = item => {
  return (dispatch, getState) => {
    const state = getState();
    const container = state.containers.selected;
    item.container_id = container.id;
    dispatch(deleteItem());
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
