import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import faker from 'faker';

import { initialState as containersInitialState } from '../../../../src/redux/modules/containers';
import DecoratedContainerForm, { ContainerForm, mapStateToProps, mapDispatchToProps, validate } from '../../../../src/components/pages/Items/ContainerForm';
import { ModalTypes } from '../../../../src/redux/modules/utils';

const defaultState = {
	containers: containersInitialState,
	form: {}
};

describe('ContainerForm', () => {
	it('works', () => {
		const handleSubmit = sinon.spy();
		const title = faker.lorem.words();
		const output = shallow(<ContainerForm handleSubmit={handleSubmit} title={title} />);
		expect(output.is('FormModal')).toBe(true);
		const fields = output.find('Field');
		expect(fields.get(0).props.name).toBe('name');
		expect(fields.get(1).props.name).toBe('description');
	});

	it('renders keep open field on create', () => {
		const handleSubmit = sinon.spy();
		const title = faker.lorem.words();
		const output = shallow(<ContainerForm handleSubmit={handleSubmit} title={title} type={ModalTypes.CREATE} />);
		expect(output.is('FormModal')).toBe(true);
		const fields = output.find('Field');
		expect(fields.get(0).props.name).toBe('name');
		expect(fields.get(1).props.name).toBe('description');
		expect(fields.get(2).props.name).toBe('keepOpen');
	});	

	describe('validate', () => {

		it('works', () => {
			const errors = validate({ name: faker.lorem.words() });
			expect(Object.keys(errors).length).toBe(0);
		});		

		it('requires name to be present', () => {
			const errors = validate({});
			expect(Object.keys(errors).length).toBe(1);
		});

		it('requires name to be non-empty', () => {
			const errors = validate({ name: '' });
			expect(Object.keys(errors).length).toBe(1);
		});		
	});

	describe('map state to props', () => {

		
		it('works', () => {
			const action = 'Add';
			const state = {
				...defaultState,
				containers: {
					...containersInitialState,
					showContainerForm: ModalTypes.CREATE
				}
			}
			const props = mapStateToProps(state);
			expect(props.showModal).toBe(true);
			expect(props.type).toBe(ModalTypes.CREATE);
			expect(props.title).toBe(action + ' Container');
			expect(props.submitButtonBsStyle).toBe('success');
			expect(props.submitButtonText).toBe(action);
			expect(props.readOnly).toBe(false);
			
		});

		it('edits', () => {
			const action = 'Edit';
			const containerForm = defaultState.containerForm;
			const props = mapStateToProps({
				...defaultState,
				containers: {
					...containersInitialState,
					showContainerForm: ModalTypes.EDIT
				}
			});
			expect(props.showModal).toBe(true);
			expect(props.type).toBe(ModalTypes.EDIT);
			expect(props.title).toBe(action + ' Container');
			expect(props.submitButtonBsStyle).toBe('primary');
			expect(props.submitButtonText).toBe(action);
			expect(props.readOnly).toBe(false);
		});

		it('deletes', () => {
			const action = 'Delete';
			const containerForm = defaultState.containerForm;
			const props = mapStateToProps({
				...defaultState,
				containers: {
					...containersInitialState,
					showContainerForm: ModalTypes.DELETE
				}
			});
			expect(props.showModal).toBe(true);
			expect(props.type).toBe(ModalTypes.DELETE);
			expect(props.title).toBe(action + ' Container');
			expect(props.submitButtonBsStyle).toBe('danger');
			expect(props.submitButtonText).toBe(action);
			expect(props.readOnly).toBe(true);
		});

		it('hides', () => {
			const action = 'Delete';
			const containerForm = defaultState.containerForm;
			const props = mapStateToProps({
				...defaultState,
				containers: {
					...containersInitialState,
					showContainerForm: ModalTypes.NONE
				}			
			});
			expect(props.showModal).toBe(false);
			expect(props.type).toBe(ModalTypes.NONE);
		});
	});

	describe('match dipatch to props', () => {
		it('works', () => {
			const dispatch = sinon.spy();
			const props = mapDispatchToProps(dispatch);
			expect('onHide' in props).toBe(true);
		});
	});

});