import { createAction } from 'redux-actions';

import * as types from '../constants/ActionTypes'


export const toggleAddItemForm = createAction(types.TOGGLE_ADD_ITEM_FORM);
export const setItemFormError = createAction(types.SET_ITEM_FORM_ERROR);