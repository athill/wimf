export const ModalTypes = {
  NONE: 'NONE',
  CREATE: 'CREATE',
  EDIT: 'EDIT',
  DELETE: 'DELETE'
};

export function defaultFormModalHandler(type, state, action) {
  type = type.toUpperCase();
  if (action.type === 'TOGGLE_ADD_'+type+'_FORM') {
    return {
  	  ...state,
  	  show: state.show == ModalTypes.NONE ? ModalTypes.CREATE : ModalTypes.NONE,
      selected: undefined
    };
  } else if (action.type === 'SHOW_DELETE_'+type+'_FORM') {
    return {
      ...state,
      show: ModalTypes.DELETE,
      selected: action.payload
    }; 
  } else if (action.type === 'SHOW_EDIT_'+type+'_FORM') {
    return {
      ...state,
      show: ModalTypes.EDIT,
      selected: action.payload
    };            
  } else if (action.type === 'SET_'+type+'_FORM_ERROR') {
    let errors = action.payload.error;
    if (!(errors instanceof Array)) {
      errors = [errors];
    }
	  return {
		  ...state,
		  errors
	  };
  } else if (action.type === 'HIDE_'+type+'_FORM') {
    return {
      ...state,
      show: ModalTypes.NONE,
      selected: undefined
    };
  } else {
    return state;
  }
}