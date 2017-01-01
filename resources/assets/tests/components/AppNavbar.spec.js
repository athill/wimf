import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import faker from 'faker';
import sinon from 'sinon';

import AppNavbar from '../../src/components/AppNavbar';

const mockStore = configureStore();

const state = {
	user: {
		email: faker.internet.email(),
		name: faker.name.findName()
	}
}

describe('AppNavbar', () => {
	it('works', () => {
		const output = shallow(<AppNavbar store={mockStore(state)} />);
		expect(output.props().isDemo).toBe(false);
	});

	it('sets demo according to email', () => {
		const demoUserStore = {
			user: {
				id: 88888888,
				name: 'demo',
				email: 'demo@demo.com'
			}			
		};
		const output = shallow(<AppNavbar store={mockStore(demoUserStore)} />);
		expect(output.props().isDemo).toBe(true);
	});

	xit('works2', () => {
		const dispatch = sinon.spy();
		const output = mount(<AppNavbar dispatch={dispatch} store={mockStore(state)} />);
		console.log(output.debug());
	});	
});