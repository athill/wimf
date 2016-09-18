import expect from 'expect';
import reducer, { initialState } from '../../reducers/user';
import * as types from '../../constants/ActionTypes';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  it('should handle RECEIVE_USER_INFO', () => {
    const user = {
    	id: 0,
    	email: 'foo@bar.com',
    	name: 'foo bar'
    };
    expect(
      reducer(initialState, {
        type: types.RECEIVE_USER_INFO,
        payload: user
      })
    ).toEqual(user);
  });
});


