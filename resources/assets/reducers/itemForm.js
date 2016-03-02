import { TOGGLE_ADD_ITEM_FORM, SHOW_ADD_FORM, HIDE_ADD_FORM,
	SET_ITEM_FORM_ERROR, ModalTypes } from '../constants/ActionTypes'

export const initialState = {
    show: ModalTypes.NONE,
    errors: []
};

export default function addForm(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_ADD_ITEM_FORM:
      return {
      	...state,
      	show: state.show == ModalTypes.NONE ? ModalTypes.CREATE : ModalTypes.NONE
      };
    case SET_ITEM_FORM_ERROR:
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
