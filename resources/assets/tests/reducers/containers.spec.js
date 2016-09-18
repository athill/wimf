import expect from 'expect';
import reducer, { initialState } from '../../src/reducers/containers';
import * as types from '../../src/constants/ActionTypes';

describe('containers reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  it('should handle RECEIVE_CONTAINERS', () => {
	const items = [{
    				name: 'Freezer',
            id: 0,
            description: ''
    }];
    const containers = {
      items,
      selected: items[0]
    }
    expect(
      reducer(initialState, {
        type: types.RECEIVE_CONTAINERS,
        payload: containers
      })
    ).toEqual(containers);
  });
});