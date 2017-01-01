import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';

import InlineField from '../../../src/components/common/InlineField';

describe('InlineField', () => {
	it('works', () => {
		const id = faker.lorem.word();
		const label = faker.lorem.words();
		const output = shallow(<InlineField id={id} label={label} />);
		//// label
		const labelElem = output.find('label');
		expect(labelElem.length).toBe(1);
		expect(labelElem.props().htmlFor).toBe(id);
		expect(labelElem.props().className).toBe('sr-only');
		expect(labelElem.children().node).toBe(label);
		//// input
		const input = output.find('input');
		expect(input.length).toBe(1);
		expect(input.props().id).toBe(id);
		expect(input.props().type).toBe('text');
		expect(input.props().placeholder).toBe(label);
	});
});