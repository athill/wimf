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

export const { LOADING, ERROR, SUCCESS } = stateConstants;

//// Modal types
export const ModalTypes = {
  NONE: 'NONE',
  CREATE: 'CREATE',
  EDIT: 'EDIT',
  DELETE: 'DELETE'
};

export const validModalTypes = Object.keys(ModalTypes).map(key => ModalTypes[key]);

export const loadingStates = {
	CLEAN: 'CLEAN',
	LOADING: 'LOADING',
	COMPLETE: 'COMPLETE'
};

export const validLoadingStates = Object.keys(loadingStates).map(key => loadingStates[key]);

/**
 * helper for defining constants
 * @param  {string} constant Root constant name
 * @param  {Array=[SUCCESS]}  states   Array of constant suffixes to create
 * @return {object}          redux-define constant object
 */
export const getConstants = (constant, states = []) => appNamespace.defineAction(constant, [ ...states, LOADING, SUCCESS, ERROR ]);

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
    const finalUrl = format(url, values);
    return (dispatch, getState) => {
      dispatch(requestAction());
      return handler(
        finalUrl,
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


export const formModalReducer = ({ formKey, hide, selectedKey, showAdd, showDelete, showEdit }) => (state, action) => {
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
};
