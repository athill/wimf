import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';

import ValidatedInput from '../../../src/components/common/ValidatedInput';

describe('ValidatedInput', () => {
	const meta = {
		touched: false,
		error: {},
		warning: {},
		valid: true
	}
	it('works', () => {
		const label = faker.lorem.words();
		const output = shallow(<ValidatedInput label={label} meta={meta} />);
		expect(output.is('FormGroup')).toBe(true);
		const inputLabel = output.find('InputLabel');
		expect(inputLabel.length).toBe(1);
		expect(inputLabel.props().title).toBe(label);
		const formControl = output.find('FormControl');
		expect(formControl.length).toBe(1);
		
	});

	it('renders read-only', () => {
		const input = {
			value: faker.lorem.words()
		}
		const label = faker.lorem.words();
		const output = shallow(<ValidatedInput label={label} meta={meta} readOnly={true} input={input} />);
		expect(output.is('FormGroup')).toBe(true);
		const controlLabel = output.find('ControlLabel');
		expect(controlLabel.length).toBe(1);
		expect(controlLabel.children().node).toBe(label);
		const formControl = output.find('FormControlStatic');
		expect(formControl.length).toBe(1);
		expect(formControl.children().node).toBe(input.value);
	});

	it('displays a warning', () => {
		const input = {
			value: faker.lorem.words()
		}
		const label = faker.lorem.words();
		const warningMeta = {
			...meta,
			touched: true,
			warning: faker.lorem.words()
		};
		const output = shallow(<ValidatedInput label={label} meta={warningMeta} input={input} />);
		const inputLabel = output.find('InputLabel');
		expect(inputLabel.props().warning).toBe(warningMeta.warning);
	});
});