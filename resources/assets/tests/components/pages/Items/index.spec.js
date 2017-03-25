import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';
import sinon from 'sinon';
import deepFreeze from 'deep-freeze';

import DecoratedItems, { Items, mapDispatchToProps, mapStateToProps } from '../../../../src/components/pages/Items';

describe('Items', () => {
	describe('component', () => {
		it('works', () => {
			const output = shallow(<Items />);		
			expect(output.is('div')).toBe(true);
			expect(output.find('ContainerSelector').length).toBe(1);
			expect(output.find('Filter').length).toBe(1);
			expect(output.find('Container').length).toBe(1);
			expect(output.find('AddButton').length).toBe(1);
			expect(output.find('Connect(ReduxForm)').length).toBe(2);
		});
	});	



	describe('mapStateToProps', () => {
		//// { containers, items: { categories, filter, name: containerName, loading: containerLoading }}
		const defaultState = {
			containers: {},
			items: {
				categories: [],
				filter: '',
				name: faker.lorem.words(),
				loading: false
			}
		};
		it('works', () => {
			const props = mapStateToProps(defaultState);
			expect(props.containers).toEqual(defaultState.containers);
			expect(props.categories).toEqual(defaultState.items.categories);
			expect(props.containerName).toEqual(defaultState.items.name);
			expect(props.containerLoading).toEqual(defaultState.items.loading);
		});

		it('handles non-empty filter', () => {
			let state = { ...defaultState };
			state.items.filter = faker.lorem.word();
			deepFreeze(state);
			const props = mapStateToProps(state);
		});
	});
});
