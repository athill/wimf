import { createAction } from 'redux-actions';

import { defaultFormModalHandler, ModalTypes } from '../../util/formModal';

//// actions
export const TOGGLE_ADD_CONTAINER_FORM = 'TOGGLE_ADD_CONTAINER_FORM';
export const SHOW_ADD_CONTAINER_FORM = 'SHOW_ADD_CONTAINER_FORM';
export const SHOW_DELETE_CONTAINER_FORM = 'SHOW_DELETE_CONTAINER_FORM';
export const SHOW_EDIT_CONTAINER_FORM = 'SHOW_EDIT_CONTAINER_FORM';
export const HIDE_CONTAINER_FORM = 'HIDE_CONTAINER_FORM';

//// reducer
export const initialState = {
    show: ModalTypes.NONE,
};

export default function reducer(state = initialState, action={}) {
  return defaultFormModalHandler('CONTAINER', state, action);
}

//// action creators
export const toggleAddContainerForm = createAction(TOGGLE_ADD_CONTAINER_FORM);
export const hideContainerForm = createAction(HIDE_CONTAINER_FORM);
export const showDeleteContainerForm = createAction(SHOW_DELETE_CONTAINER_FORM);
export const showEditContainerForm = createAction(SHOW_EDIT_CONTAINER_FORM);
