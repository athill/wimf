import { createAction } from 'redux-actions';

import { defaultFormModalHandler, ModalTypes } from './utils';

//// actions
export const TOGGLE_ADD_ITEM_FORM = 'TOGGLE_ADD_ITEM_FORM';
export const SHOW_ADD_ITEM_FORM = 'SHOW_ADD_ITEM_FORM';
export const SHOW_DELETE_ITEM_FORM = 'SHOW_DELETE_ITEM_FORM';
export const SHOW_EDIT_ITEM_FORM = 'SHOW_EDIT_ITEM_FORM';
export const HIDE_ITEM_FORM = 'HIDE_ITEM_FORM';

//// reducer
export const initialState = {
    show: ModalTypes.NONE,
    selected: undefined
};

export default function reducer(state = initialState, action) {
  return defaultFormModalHandler('ITEM', state, action);
}

//// action creators
export const hideItemForm = createAction(HIDE_ITEM_FORM);
export const showDeleteItemForm = createAction(SHOW_DELETE_ITEM_FORM);
export const showEditItemForm = createAction(SHOW_EDIT_ITEM_FORM);
export const toggleAddItemForm = createAction(TOGGLE_ADD_ITEM_FORM);
