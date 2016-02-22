import expect from 'expect';

import * as actions from '../../actions/addForm';
import * as types from '../../constants/ActionTypes';

describe('addFormActions actions', () => {
	describe('setAddFormError', () => {
	   const text = 'foo'
	    const expectedAction = {
	      type: types.SET_ADD_FORM_ERROR,
	      payload: text
	    }
	    expect(actions.setAddFormError(text)).toEqual(expectedAction)		
	});
});