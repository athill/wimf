import React from 'react';
import { mount } from 'enzyme';
import faker from 'faker';
import { reduxForm } from 'redux-form';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import DatePicker from '../../../components/common/Datepicker';
import ValidatedInput from '../../../components/common/ValidatedInput';


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
    const defaultProps = { input, label, meta, name, onChange: jest.fn() };

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
        expect(output.type()).toBe(Provider);
        const datePicker = output.find(DatePicker);
        const validatedInput = datePicker.find(ValidatedInput);
        expect(datePicker.props().readOnly).toBe(true);
        expect(validatedInput.props().readOnly).toBe(true);
	});



});
