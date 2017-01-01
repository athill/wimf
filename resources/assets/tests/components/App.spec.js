import React from 'react';
import { shallow } from 'enzyme';

import App from '../../src/components/App';

describe('App', () => {
	it('renders', () => {
		const output = shallow(<App>foo</App>);
		const div = output.find('div');
		expect(div.length).toBe(1);
		const navbar = div.find('Connect(AppNavbar)');
		expect(navbar.length).toBe(1);
		const container = div.find('AppContainer');
		expect(container.length).toBe(1);
		expect(container.children().nodes).toEqual(['foo']);
	});
});