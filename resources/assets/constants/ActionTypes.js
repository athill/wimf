
	//// containers
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

//// user info
export const REQUEST_USER_INFO = 'REQUEST_USER_INFO';
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO';
//// item form
export const TOGGLE_ADD_ITEM_FORM = 'TOGGLE_ADD_ITEM_FORM';
export const SHOW_ADD_ITEM_FORM = 'SHOW_ADD_ITEM_FORM';
export const SHOW_DELETE_ITEM_FORM = 'SHOW_DELETE_ITEM_FORM';
export const SHOW_EDIT_ITEM_FORM = 'SHOW_EDIT_ITEM_FORM';
export const HIDE_ITEM_FORM = 'HIDE_ITEM_FORM';
export const CLEAR_ADD_FORM = 'CLEAR_ADD_FORM';
export const SET_ITEM_FORM_ERROR = 'SET_ITEM_FORM_ERROR';
//// container form
export const TOGGLE_ADD_CONTAINER_FORM = 'TOGGLE_ADD_CONTAINER_FORM';
export const SHOW_ADD_CONTAINER_FORM = 'SHOW_ADD_CONTAINER_FORM';
export const SHOW_DELETE_CONTAINER_FORM = 'SHOW_DELETE_CONTAINER_FORM';
export const SHOW_EDIT_CONTAINER_FORM = 'SHOW_EDIT_CONTAINER_FORM';
export const HIDE_CONTAINER_FORM = 'HIDE_CONTAINER_FORM';
export const SET_CONTAINER_FORM_ERROR = 'SET_CONTAINER_FORM_ERROR';

//// item filter
export const SET_ITEMS_FILTER = 'SET_ITEMS_FILTER';

//// Modal
export const ModalTypes = {
  NONE: 'NONE',
  CREATE: 'CREATE',
  EDIT: 'EDIT',
  DELETE: 'DELETE'
};

export function defaultFormModalHandler(type, state, action) {
  type = type.toUpperCase();
  if (action.type === 'TOGGLE_ADD_'+type+'_FORM') {
    return {
  	  ...state,
  	  show: state.show == ModalTypes.NONE ? ModalTypes.CREATE : ModalTypes.NONE,
      selected: undefined
    };
  } else if (action.type === 'SHOW_DELETE_'+type+'_FORM') {
    return {
      ...state,
      show: ModalTypes.DELETE,
      selected: action.payload
    }; 
  } else if (action.type === 'SHOW_EDIT_'+type+'_FORM') {
    return {
      ...state,
      show: ModalTypes.EDIT,
      selected: action.payload
    };            
  } else if (action.type === 'SET_'+type+'_FORM_ERROR') {
    console.debug('addForm reducer', action);
    let errors = action.payload.error;
    if (!(errors instanceof Array)) {
      errors = [errors];
    }
	  return {
		  ...state,
		  errors
	  };
  } else if (action.type === 'HIDE_'+type+'_FORM') {
    return {
      ...state,
      show: ModalTypes.NONE,
      selected: undefined
    };
  } else {
    return state;
  }
}
