import { defineAction } from 'redux-define';
import { change, reset } from 'redux-form';
import format from 'string-template';


export const appNamespace = defineAction('wimf'); 

//// state constants
export const stateConstants = {
	LOADING: 'LOADING',
	ERROR: 'ERROR',
	SUCCESS: 'SUCCESS',	
};

export const ModalTypes = {
  NONE: 'NONE',
  CREATE: 'CREATE',
  EDIT: 'EDIT',
  DELETE: 'DELETE'
};

export const { LOADING, ERROR, SUCCESS } = stateConstants;

export const getConstants = (constant, states = [ SUCCESS ]) => appNamespace.defineAction(constant, states);

//// hooks into update entity
export const defaultHideFormHandler = (dispatch, formName, hideAction, values) => dispatch(hideAction());
export const defaultValuesTransformer = (values, getState) => values;

/**
 * Updates an enitity, based on properties and functions
 * @param  {string} options.formName          The redux-form name of the form
 * @param  {function} options.handler           Request handler, 
 * @param  {action} options.hideAction        hide action
 * @param  {action} options.requestAction     request action
 * @param  {action} options.successAction     success action
 * @param  {string} options.url               url endpoint
 * @param  {function} options.hideFormHandler   hide form handler
 * @param  {function} options.valuesTransformer manipulate values before sending to server
 * @return {promise}                           [description]
 */
export const updateEntity = ({ formName, handler, hideAction, requestAction, successAction, url,
    hideFormHandler = defaultHideFormHandler,
    valuesTransformer = defaultValuesTransformer
   }) => {
  return (values, resolve, reject) => {
    url = format(url, values);
    return (dispatch, getState) => {
      dispatch(requestAction());
      return handler(
        url,
        valuesTransformer(values, getState),
        response => {
          dispatch(reset(formName));
          dispatch(successAction(response.data ? response : { data: values }));
          hideFormHandler(dispatch, formName, hideAction, values);     
          resolve();
        },
        error => {
          reject(error);
        }
      );
    };
  };  
};

/**
 * determines whether to keep form after successful submission open or not, autofocuses selected field by name
 * @param  {string} autofocusField name of field to autofocus if keeping form open
 * @param  {string} formName       name of redux-form object
 * @return {function(dispatch, hideAction, respone, values)} handler method for hideFormHandler
 */
export const keepOpenHandler = autofocusField => {
  /**
   * handler method for hideFormHandler
   * expects a boolean values.keepOpen to determine whether to keep the modal open after successful submission
   * @param  {function} dispatch   redux dispatch function
   * @param  {function} hideAction redux action to hide form modal
   * @param  {object} values     values passed to form
   * @return {none}            [description]
   */
  return (dispatch, formName, hideAction,  values) => {
    if (values.keepOpen) {
      dispatch(change(formName, 'keepOpen', true));
      const autofocus = document.getElementById(autofocusField);
      autofocus.focus();
    } else {
      dispatch(hideAction());
    } 
  }
};


export const formModalHandler = ({ formKey, hide, selectedKey, showAdd, showDelete, showEdit }) => (state, action) => {
	switch (action.type) {
		case showAdd:
		    return {
		  	  ...state,
		  	  [formKey]: state[formKey] === ModalTypes.NONE ? ModalTypes.CREATE : ModalTypes.NONE,
		  	  [selectedKey]: undefined,
		    };
		case showDelete:
		    return {
		  	  ...state,
		  	  [formKey]: ModalTypes.DELETE,
		  	  [selectedKey]: action.payload,
		    };
		case showEdit:
		    return {
		  	  ...state,
		  	  [formKey]: ModalTypes.EDIT,
		  	  [selectedKey]: action.payload,
		    };
		case hide:
		    return {
		  	  ...state,
		  	  [formKey]: ModalTypes.NONE,
		  	  [selectedKey]: undefined,
		    };
		default:
			return state;
	}
}


export function defaultFormModalHandler(type, state, action) {
  type = type.toUpperCase();
  if (action.type === 'TOGGLE_ADD_'+type+'_FORM') {
    return {
  	  ...state,
  	  show: state.show === ModalTypes.NONE ? ModalTypes.CREATE : ModalTypes.NONE,
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
