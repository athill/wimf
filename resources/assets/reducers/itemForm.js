import { TOGGLE_ADD_ITEM_FORM, SHOW_ADD_FORM, HIDE_ITEM_FORM,  SHOW_DELETE_ITEM_FORM,
	SET_ITEM_FORM_ERROR, ModalTypes } from '../constants/ActionTypes'

export const initialState = {
    show: ModalTypes.NONE,
    errors: [],
    selected: undefined
};

export default function addForm(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_ADD_ITEM_FORM:
      return {
      	...state,
      	show: state.show == ModalTypes.NONE ? ModalTypes.CREATE : ModalTypes.NONE,
        selected: undefined
      };
    case SHOW_DELETE_ITEM_FORM:
      return {
        ...state,
        show: ModalTypes.DELETE,
        selected: action.payload
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
    case HIDE_ITEM_FORM:
      return {
        ...state,
        show: ModalTypes.NONE,
        selected: undefined
      };
    default:
      return state
  }
}
