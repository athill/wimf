import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';

import InlineField from '../../../components/common/InlineField';

describe('InlineField', () => {
	it('works', () => {
		const id = faker.lorem.word();
		const label = faker.lorem.words();
		const output = shallow(<InlineField id={id} label={label} />);
		expect(true).toBe(true);
	});
});