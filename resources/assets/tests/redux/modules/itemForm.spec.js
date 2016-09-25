import expect from 'expect';

import reducer, { initialState, setItemFormError, 
	SET_ITEM_FORM_ERROR, TOGGLE_ADD_ITEM_FORM } from '../../../src/redux/modules/itemForm';
import { ModalTypes } from '../../../src/util/formModal';

describe('itemForm', () => {
	//// actions
	describe('actions', () => {
		describe('setItemFormError', () => {
		    const text = 'foo'
		    const expectedAction = {
		      type: SET_ITEM_FORM_ERROR,
		      payload: text
		    }
		    expect(setItemFormError(text)).toEqual(expectedAction)		
		});
	});
	//// reducer
	 it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  it('should handle TOGGLE_ADD_ITEM_FORM by setting show: false to true', () => {
    expect(
      reducer({
        ...initialState,
        show: ModalTypes.NONE
        },  
        {
          type: TOGGLE_ADD_ITEM_FORM,
          payload: undefined
        })
    ).toEqual({
      ...initialState,
      show: ModalTypes.CREATE
    });
  });
  
  it('should handle TOGGLE_ADD_ITEM_FORM by setting show: true to false', () => {
    expect(
      reducer({
        ...initialState,
        show: ModalTypes.CREATE
        },  
        {
          type: TOGGLE_ADD_ITEM_FORM,
          payload: undefined
        })
    ).toEqual({
      ...initialState,
      show: ModalTypes.NONE
    });
  });

  it('should handle SET_ADD_FORM_ERROR by setting error to whatever is passed in', () => {
    expect(
      reducer({
        ...initialState,
        errors: ['foo']
        },  
        {
          type: SET_ITEM_FORM_ERROR,
          payload: {
            error: ['bar']
          }
        })
    ).toEqual({
      ...initialState,
      errors: ['bar']
    });
  });
});