import { TOGGLE_ADD_FORM, SHOW_ADD_FORM, HIDE_ADD_FORM,
	SET_ADD_FORM_ERROR } from '../constants/ActionTypes'

export const initialState = {
    show: false,
    errors: []
};

export default function addForm(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_ADD_FORM:
      return {
      	...state,
      	show: !state.show
      };
    case SET_ADD_FORM_ERROR:
      console.debug('addForm reducer', action);
      let errors = action.payload.error;
      if (!(errors instanceof Array)) {
        errors = [errors];
      }
    	return {
    		...state,
    		errors
    	};
    default:
      return state
  }
}
