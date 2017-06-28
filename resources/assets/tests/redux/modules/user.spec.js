import expect from 'expect';
import reducer, { initialState, REQUEST_USER_INFO } from '../../../src/redux/modules/user';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  it('should handle REQUEST_USER_INFO.SUCCESS', () => {
    const user = {
    	id: 0,
    	email: 'foo@bar.com',
    	name: 'foo bar'
    };
    expect(
      reducer(initialState, {
        type: REQUEST_USER_INFO.SUCCESS,
        payload: user
      })
    ).toEqual(user);
  });
});


