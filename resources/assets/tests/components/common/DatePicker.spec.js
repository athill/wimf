import React from 'react';
import { mount } from 'enzyme';
import faker from 'faker';
import { reduxForm } from 'redux-form';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import sinon from 'sinon';

import DatePicker from '../../../src/components/common/Datepicker';

const mockStore = configureStore();

const state = {
	user: {
		email: faker.internet.email(),
		name: faker.name.findName()
	}
};

describe('DatePicker', () => {
	const label = faker.lorem.words();
	const name = faker.lorem.words();
	const getForm = (props={ label, name }) => (
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
		expect(output.find('Field').length).toBe(1);
	});

	it('renders readonly', () => {
		const Form = getForm({ name, label, readOnly: true });
		const output = getOutput(Form);
	});



});
