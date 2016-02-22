import expect from 'expect';
import reducer, { initialState } from '../../reducers/items';
import * as types from '../../constants/ActionTypes';

describe('items reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  it('should handle RECEIVE_ITEMS', () => {
	const items = {
		items: {
			name: 'Freezer',
    		categories: [{
    				name: 'Frozen',
    				items: [{
    					name: 'peas',
    					quantity: '2',
    					measurement: 'oz'
    				}]
    			}
    		]
    	}
	};
    expect(
      reducer(initialState, {
        type: types.RECEIVE_ITEMS,
        payload: items
      })
    ).toEqual(items);
  });
});