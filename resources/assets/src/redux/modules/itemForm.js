import { createAction } from 'redux-actions';

import { defaultFormModalHandler, ModalTypes } from '../../util/formModal';

//// actions
export const TOGGLE_ADD_ITEM_FORM = 'TOGGLE_ADD_ITEM_FORM';
export const SHOW_ADD_ITEM_FORM = 'SHOW_ADD_ITEM_FORM';
export const SHOW_DELETE_ITEM_FORM = 'SHOW_DELETE_ITEM_FORM';
export const SHOW_EDIT_ITEM_FORM = 'SHOW_EDIT_ITEM_FORM';
export const HIDE_ITEM_FORM = 'HIDE_ITEM_FORM';
export const CLEAR_ADD_FORM = 'CLEAR_ADD_FORM';
export const SET_ITEM_FORM_ERROR = 'SET_ITEM_FORM_ERROR';

//// reducer
export const initialState = {
    show: ModalTypes.NONE,
    errors: [],
    selected: undefined
};

export default function reducer(state = initialState, action) {
  return defaultFormModalHandler('ITEM', state, action);
}

//// action creators
export const toggleAddItemForm = createAction(TOGGLE_ADD_ITEM_FORM);
export const setItemFormError = createAction(SET_ITEM_FORM_ERROR);
export const hideItemForm = createAction(HIDE_ITEM_FORM);
export const showDeleteItemForm = createAction(SHOW_DELETE_ITEM_FORM);
export const showEditItemForm = createAction(SHOW_EDIT_ITEM_FORM);