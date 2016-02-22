import { TOGGLE_ADD_FORM, SHOW_ADD_FORM, HIDE_ADD_FORM,
	SET_ADD_FORM_ERROR } from '../constants/ActionTypes'

export const initialState = {
    show: false,
    error: ''
};

export default function addForm(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_ADD_FORM:
      return {
      	...state,
      	show: !state.show
      };
    case SET_ADD_FORM_ERROR:
    	return {
    		...state,
    		error: action.payload.error
    	};
    default:
      return state
  }
}
