import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';

import { Icon, Spinner, NoOp } from '../../../components/common/common';

describe('common', () => {
	describe('Icon', () => {
		it('works', () => {
			const iconName = faker.lorem.word();
			const output = shallow(<Icon icon={iconName} />);
			expect(output.props().className).toBe(`fa fa-${iconName} fa-lg`);
		});
	});

	describe('Spinner', () => {
		it('works', () => {
			const output = shallow(<Spinner />);
			const icon = output.find('Icon');
			expect(icon.length).toBe(1);
			const props = icon.props();
			expect(props.icon).toBe('cog');
			expect(props.size).toBe('lg');
			expect(props.spinning).toBe(true);
		});
	});

	describe('NoOp', () => {
		it('works', () => {
			const output = shallow(<NoOp />);
			expect(output.is('noscript')).toBe(true);
		});

	});
});