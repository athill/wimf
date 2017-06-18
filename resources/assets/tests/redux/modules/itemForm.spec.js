import expect from 'expect';

import reducer, { initialState, setItemFormError, 
	SET_ITEM_FORM_ERROR, TOGGLE_ADD_ITEM_FORM } from '../../../src/redux/modules/itemForm';
import { ModalTypes } from '../../../src/util/formModal';

describe('itemForm', () => {
	//// actions
	describe('actions', () => {
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
  });
});