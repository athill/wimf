import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';

import ValidatedInput, { InputLabel } from '../../../src/components/common/ValidatedInput';

describe('InputLabel', () => {
	const title = faker.lorem.words();
	it('works', () => {
		const output = shallow(<InputLabel title={title} />);
		expect(output.is('ControlLabel')).toBe(true);
		expect(output.children().node).toBe(title);
	});

	it('handles warnings', () => {
		const warning = faker.lorem.words();
		const output = shallow(<InputLabel title={title} warning={warning} />);
		expect(output.is('ControlLabel')).toBe(true);
		const overlayTrigger = output.find('OverlayTrigger');
		expect(overlayTrigger.props().overlay.props.children).toBe(warning);
		const icon = overlayTrigger.find('Icon');
		expect(icon.props().icon).toBe('exclamation-triangle');
	});

	it('handles errors', () => {
		const error = faker.lorem.words();
		const output = shallow(<InputLabel title={title} error={error} />);
		expect(output.is('ControlLabel')).toBe(true);
		const overlayTrigger = output.find('OverlayTrigger');
		expect(overlayTrigger.props().overlay.props.children).toBe(error);
		const icon = overlayTrigger.find('Icon');
		expect(icon.props().icon).toBe('times-circle');
	});	
});

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

	it('displays an error', () => {
		const input = {
			value: faker.lorem.words()
		}
		const label = faker.lorem.words();
		const errorMeta = {
			...meta,
			touched: true,
			valid: false,
			error: faker.lorem.words()
		};
		const output = shallow(<ValidatedInput label={label} meta={errorMeta} input={input} />);
		const inputLabel = output.find('InputLabel');
		expect(inputLabel.props().error).toBe(errorMeta.error);
	});	

	it('shows a help block', () => {
		const help = faker.lorem.words();
		const label = faker.lorem.words();
		const output = shallow(<ValidatedInput label={label} meta={meta} help={help} />);
		const helpBlock = output.find('HelpBlock');
		expect(helpBlock.children().node).toBe(help);
	});
});