import expect from 'expect';

import * as actions from '../../actions/itemForm';
import * as types from '../../constants/ActionTypes';

describe('itemForm actions', () => {
	describe('setItemFormError', () => {
	   const text = 'foo'
	    const expectedAction = {
	      type: types.SET_ITEM_FORM_ERROR,
	      payload: text
	    }
	    expect(actions.setItemFormError(text)).toEqual(expectedAction)		
	});
});