import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import faker from 'faker';
import sinon from 'sinon';

import AppNavbar, { AppNavbar as UndecoratedAppNavbar } from '../../src/components/AppNavbar';

const mockStore = configureStore();

const state = {
	user: {
		email: faker.internet.email(),
		name: faker.name.findName()
	}
};

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

	it('works undecorated demo', () => {
		const dispatch = sinon.spy();
		const output = mount(<UndecoratedAppNavbar dispatch={dispatch} store={mockStore(state)} user={state.user} isDemo={true} />);
		expect(dispatch.calledOnce).toBe(true);
		const menuItems = output.find('MenuItem');
		expect(menuItems.get(0).props.children).toBe('Login');
		expect(menuItems.get(1).props.children).toBe('Register');
	});	

	it('works undecorated non-demo', () => {
		const dispatch = sinon.spy();
		const output = mount(<UndecoratedAppNavbar dispatch={dispatch} store={mockStore(state)} user={state.user} isDemo={false} />);
		expect(dispatch.calledOnce).toBe(true);
		const menuItems = output.find('MenuItem');
		expect(menuItems.get(0).props.children).toBe('Logout');
	});		
});