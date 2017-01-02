import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';

import ContainerWelcome from '../../../../src/components/pages/Items/ContainerWelcome';

describe('ContainerWelcome', () => {
	it('works', () => {
		const name = faker.lorem.words();
		const output = shallow(<ContainerWelcome name={name} />);
		expect(output.is('Alert')).toBe(true);
		const h4 = output.find('h4');
		expect(h4.children().nodes.join('')).toBe(`Your ${name} is empty!`);
	});
});