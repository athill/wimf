import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';
import sinon from 'sinon';
import deepFreeze from 'deep-freeze';

import DecoratedItems, { Items, mapDispatchToProps, mapStateToProps } from '../../../../components/pages/items';

describe('Items', () => {
	describe('component', () => {
		const dispatch = jest.fn();
		it('works', () => {
			const output = shallow(<Items dispatch={dispatch} />);		
			expect(output.is('div')).toBe(true);
			expect(output.find('ContainerSelector').length).toBe(1);
			expect(output.find('Filter').length).toBe(1);
			expect(output.find('Container').length).toBe(1);
			expect(output.find('AddButton').length).toBe(1);
			expect(output.find('Connect(ReduxForm)').length).toBe(2);
		});
	});	



	describe('mapStateToProps', () => {
		const selectedId = 0;
		//// { containers: { containers, filter, loading, selectedId } }
		const defaultState = {
			containers: {
				containers: {
					[selectedId]: {
						name: faker.lorem.words(),
						categories: [
							{
								name: faker.lorem.words(),
								items: []							
							}
						]
					}
				},
				filter: '',
				loading: false,
				selectedId
			}
		};
		it('works', () => {
			const props = mapStateToProps(defaultState);
			expect(props.containers).toEqual(defaultState.containers.containers);
			expect(props.categories).toEqual(defaultState.containers.containers[selectedId].categories);
			expect(props.containerName).toEqual(defaultState.containers.containers[selectedId].name);
			expect(props.containerLoading).toEqual(defaultState.containers.loading);
		});

		it('handles non-empty filter', () => {
			let state = { ...defaultState };
			state.filter = faker.lorem.word();
			deepFreeze(state);
			const props = mapStateToProps(state);
		});
	});
});
