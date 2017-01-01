import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Filter from '../../../src/components/common/Filter';

describe('Filter', () => {
	const title = 'foo';
	it('works', () => {
		const output = shallow(<Filter title={title} />);
		const form = output.find('form');
		expect(form.length).toBe(1);
		const formGroup = output.find('FormGroup');
		expect(formGroup.length).toBe(1);		
		expect(formGroup.find('ControlLabel').length).toBe(1);
		expect(formGroup.find('FormControl').length).toBe(1);
	});

	it('clicks', () => {
		const handleChange = sinon.spy();
		const output = shallow(<Filter handleChange={handleChange} />);
		output.find('FormControl').simulate('change', { target: { value: 'foo' } });
		expect(handleChange.calledOnce).toBe(true);
	});
});