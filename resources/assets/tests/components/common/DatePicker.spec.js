import React from 'react';
import { mount } from 'enzyme';
import faker from 'faker';
import { reduxForm } from 'redux-form';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import sinon from 'sinon';

import DatePicker from '../../../src/components/common/Datepicker';

import { getFakeReduxFormProps } from '../../testUtil/utils';

const mockStore = configureStore();

const state = {
	user: {
		email: faker.internet.email(),
		name: faker.name.findName()
	}
};

describe('Datepicker', () => {
	const label = faker.lorem.words();
	const name = faker.lorem.words();
	const { input, meta } = getFakeReduxFormProps();
	const defaultProps = { input, label, meta, name };
	const getForm = (props=defaultProps) => (
		reduxForm({ form: 'foo' })(() => (
			<form>
				<DatePicker {...props} />
			</form>
		)	
	));

	const getOutput = Form => (
		mount(<Provider store={mockStore(state)}><Form /></Provider>)
	);

	it('works', () => {
		const Form = getForm();
		const output = getOutput(Form);
		expect(output.find('ValidatedInput').length).toBe(1);
	});

	it('renders readonly', () => {
		const Form = getForm({ ...defaultProps, readOnly: true });
		const output = getOutput(Form);
	});



});
