import faker from 'faker';

export const getFakeReduxFormProps = () => {
	return {
		input: {	
			name: faker.lorem.word(),
			value: ""
		},
		meta: {
			visited: false,
			touched: false,
			active: false,
			asyncValidating: false,
			autofilled: false,
			dirty: false,
			error: "",
			invalid: false,
			pristine: true,
			submitting: false,
			valid: true
		}
	}	
}