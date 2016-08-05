import { createAction } from 'redux-actions';

import * as types from '../constants/ActionTypes'


export const toggleAddContainerForm = createAction(types.TOGGLE_ADD_CONTAINER_FORM);
export const setContainerFormError = createAction(types.SET_CONTAINER_FORM_ERROR);
export const hideContainerForm = createAction(types.HIDE_CONTAINER_FORM);
export const showDeleteContainerForm = createAction(types.SHOW_DELETE_CONTAINER_FORM);
export const showEditContainerForm = createAction(types.SHOW_EDIT_CONTAINER_FORM);