import axios from 'axios';
import { createAction } from 'redux-actions';

import { TOGGLE_ADD_ITEM_FORM, SHOW_ADD_ITEM_FORM, SHOW_DELETE_ITEM_FORM, SHOW_EDIT_ITEM_FORM, HIDE_ITEM_FORM, 
    CLEAR_ADD_FORM, SET_ITEM_FORM_ERROR, 
    setItemFormError } from '../redux/modules/itemForm';

//// utils
import { getIsoFormat } from '../util/DateUtils';
import { fetch, post, deleteRequest, put } from '../util/RemoteOperations';


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


const requestItems = createAction(REQUEST_ITEMS);
const receiveItems = createAction(RECEIVE_ITEMS, data => processItems(data));

const addItem = createAction(ADD_ITEM);
const addItemSuccess = createAction(ADD_ITEM_SUCCESS);
const addItemError = createAction(ADD_ITEM_ERROR);


const deleteItem = createAction(DELETE_ITEM);
const deleteItemSuccess = createAction(DELETE_ITEM_SUCCESS);
const deleteItemError = createAction(DELETE_ITEM_ERROR);

const editItem = createAction(EDIT_ITEM);
const editItemSuccess = createAction(EDIT_ITEM_SUCCESS);
const editItemError = createAction(EDIT_ITEM_ERROR);

export const setItemsFilter = createAction(SET_ITEMS_FILTER);


const processItems = (json) => {
  return json;
}
