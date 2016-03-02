import expect from 'expect';
import reducer, { initialState } from '../../reducers/itemForm';
import * as types from '../../constants/ActionTypes';

describe('itemForm reducer', () => {
  
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  it('should handle TOGGLE_ADD_ITEM_FORM by setting show: false to true', () => {
    expect(
      reducer({
        ...initialState,
        show: types.ModalTypes.NONE
        },  
        {
          type: types.TOGGLE_ADD_ITEM_FORM,
          payload: undefined
        })
    ).toEqual({
      ...initialState,
      show: types.modalTypes.CREATE
    });
  });
  
  it('should handle TOGGLE_ADD_ITEM_FORM by setting show: true to false', () => {
    expect(
      reducer({
        ...initialState,
        show: types.modalTypes.CREATE
        },  
        {
          type: types.TOGGLE_ADD_ITEM_FORM,
          payload: undefined
        })
    ).toEqual({
      ...initialState,
      show: types.modalTypes.NONE
    });
  });

  it('should handle SET_ADD_FORM_ERROR by setting error to whatever is passed in', () => {
    expect(
      reducer({
        ...initialState,
        error: 'foo'
        },  
        {
          type: types.SET_ITEM_FORM_ERROR,
          payload: {
            error: 'bar'
          }
        })
    ).toEqual({
      ...initialState,
      error: 'bar'
    });
  }); 
});