import expect from 'expect';
import reducer, { RECEIVE_CONTAINERS, initialState } from '../../src/redux/modules/containers';

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
        type: RECEIVE_CONTAINERS,
        payload: containers
      })
    ).toEqual(containers);
  });
});