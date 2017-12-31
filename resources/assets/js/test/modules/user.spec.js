import reducer, { initialState, LOGIN_USER, LOGOUT_USER, REQUEST_USER_INFO } from '../../modules/user';
import { loadingStates } from '../../modules/utils';



describe('user module', () => {
	describe('reducer', () => {
		describe('LOGIN_USER.SUCCESS', () => {
			it('should update state and updates sessionStorage', () => {
				const newState = reducer(initialState, { type: LOGIN_USER.SUCCESS, payload: { token: 'foo' } });
				expect(newState).toEqual({
					...initialState,
					authenticated: true
				});
				expect(sessionStorage.setItem).toHaveBeenLastCalledWith('token', 'foo');
			});
			it('updates localStorage if remember token is present', () => {
				const newState = reducer(initialState, { type: LOGIN_USER.SUCCESS, payload: { token: 'foo', remember: true } });
				expect(localStorage.setItem).toHaveBeenLastCalledWith('token', 'foo');
			});			
		});
		describe('LOGOUT_USER.SUCCESS', () =>{ 
			it('should update state and clear storage', () => {
				const newState = reducer(initialState, { type: LOGOUT_USER.SUCCESS });
				expect(newState).toEqual(initialState);
				expect(localStorage.removeItem).toHaveBeenLastCalledWith('token');
				expect(sessionStorage.removeItem).toHaveBeenLastCalledWith('token');
			});
		});		
		describe('REQUEST_USER_INFO', () =>{ 
			it('should update state', () => {
				const newState = reducer(initialState, { type: REQUEST_USER_INFO.ACTION });
				expect(newState).toEqual({
					...initialState,
					loading: loadingStates.LOADING
				});
			});
		});
		describe('REQUEST_USER_INFO.SUCCESS', () =>{ 
			it('should update state', () => {
				const payload = {
					id: 'foo',
					name: 'Foo Bar',
					email: 'foo@bar.baz'
				};
				const newState = reducer(initialState, { type: REQUEST_USER_INFO.SUCCESS, payload });
				expect(newState).toEqual({
					...initialState,
					...payload,
					loading: loadingStates.COMPLETE,
					authenticated: true
				});
			});
		});		
	});
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