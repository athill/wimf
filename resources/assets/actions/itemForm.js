import { createAction } from 'redux-actions';

import * as types from '../constants/ActionTypes'


export const toggleAddItemForm = createAction(types.TOGGLE_ADD_ITEM_FORM);
export const setItemFormError = createAction(types.SET_ITEM_FORM_ERROR);
export const hideItemForm = createAction(types.HIDE_ITEM_FORM);
export const showDeleteItemForm = createAction(types.SHOW_DELETE_ITEM_FORM);