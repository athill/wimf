import expect from 'expect';
import reducer, { initialState, RECEIVE_USER_INFO } from '../../../src/redux/modules/user';

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
        type: RECEIVE_USER_INFO,
        payload: user
      })
    ).toEqual(user);
  });
});


