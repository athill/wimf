import { createAction } from 'redux-actions';

import * as types from '../constants/ActionTypes'


export const toggleAddForm = createAction(types.TOGGLE_ADD_FORM);
export const setAddFormError = createAction(types.SET_ADD_FORM_ERROR);