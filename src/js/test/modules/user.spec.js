import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import reducer, { initialState, fetchUserInfo, LOGIN_USER, LOGOUT_USER, REQUEST_USER_INFO } from '../../modules/user';
import { loadingStates } from '../../modules/utils';

const mock = new MockAdapter(axios);

const userPayload = {
	id: 'foo',
	name: 'Foo Bar',
	email: 'foo@bar.baz'
};

describe('user module', () => {
	describe('reducer', () => {
		describe('LOGIN_USER.SUCCESS', () => {
			it.skip('should update state and updates sessionStorage', () => {
				sessionStorage.setItem = jest.fn();
				const newState = reducer(initialState, { type: LOGIN_USER.SUCCESS, payload: { access_token: 'foo' } });
				expect(newState).toEqual({
					...initialState,
					authenticated: true
				});
				expect(sessionStorage.setItem).toHaveBeenLastCalledWith('token', 'foo');
			});
			it.skip('updates localStorage if remember token is present', () => {
				const newState = reducer(initialState, { type: LOGIN_USER.SUCCESS, payload: { access_token: 'foo', remember: true } });
				expect(localStorage.setItem).toHaveBeenLastCalledWith('token', 'foo');
			});			
		});
		describe('LOGOUT_USER.SUCCESS', () =>{ 
			it.skip('should update state and clear storage', () => {
				const newState = reducer(initialState, { type: LOGOUT_USER.SUCCESS });
				expect(newState).toEqual(initialState);
				expect(localStorage.removeItem).toHaveBeenLastCalledWith('token');
				expect(sessionStorage.removeItem).toHaveBeenLastCalledWith('token');
			});
		});		
		describe('REQUEST_USER_INFO', () =>{ 
			it.skip('should update state', () => {
				const newState = reducer(initialState, { type: REQUEST_USER_INFO.ACTION });
				expect(newState).toEqual({
					...initialState,
					loading: loadingStates.LOADING
				});
			});
		});
		describe('REQUEST_USER_INFO.SUCCESS', () =>{ 
			it('should update state', () => {

				const newState = reducer(initialState, { type: REQUEST_USER_INFO.SUCCESS, payload: userPayload });
				expect(newState).toEqual({
					...initialState,
					...userPayload,
					loading: loadingStates.COMPLETE,
					authenticated: true
				});
			});
		});		
	});

	// describe('actions', () => {
	// 	afterEach(() => {
	// 		sessionStorage.clear();
	// 	});		
	// 	describe('fetchUserInfo', () => {
	// 		it('fetches user info', () => {
	// 			sessionStorage.__STORE__['token'] = 'foo';
	// 			mock.onGet('/api/user').reply(200, { result: { ...userPayload } });
 //      			const dispatch = jest.fn();
 //      			fetchUserInfo()(dispatch);
 //      			console.log(dispatch.mock.calls)
	// 		});
	// 	});
	// });
});


// test('should save to localStorage', () => {
//   const KEY = 'foo',
//     VALUE = 'bar';
//   // dispatch(action.update(KEY, VALUE));
//   // expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, VALUE);
//   // expect(localStorage.__STORE__[KEY]).toBe(VALUE);
//   // expect(Object.keys(localStorage.__STORE__).length).toBe(1);
// });

// test('user happens', () => {

// });