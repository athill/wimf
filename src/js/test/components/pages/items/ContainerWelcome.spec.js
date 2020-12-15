import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';

import ContainerWelcome from '../../../../components/pages/items/ContainerWelcome';

describe('ContainerWelcome', () => {
	it('works', () => {
		const name = faker.lorem.words();
		const output = shallow(<ContainerWelcome name={name} />);
		expect(output.is('Alert')).toBe(true);
		const h4 = output.find('h4');
		expect(h4.props().children.join('')).toBe(`Your ${name} is empty!`);
	});
});