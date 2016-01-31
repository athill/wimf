import { createAction } from 'redux-actions';

import types from '../constants/ActionTypes'


export const toggleAddForm = createAction(types.TOGGLE_ADD_FORM);