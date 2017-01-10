import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import faker from 'faker';
import configureStore from 'redux-mock-store';

import DecoratedContainers, { Container, Containers, mapStateToProps, mapDispatchToProps } from '../../../../src/components/pages/Containers';

const mockStore = configureStore();

const state = {
	user: {
		email: faker.internet.email(),
		name: faker.name.findName()
	}
};

const getFakeContainer = () => ({
	id: faker.random.number(),
	name: faker.lorem.word(),
	description: faker.lorem.words()
});

describe('Container', () => {

	it('works', () => {
		const output = shallow(<Container container={getFakeContainer()} />);
		expect(output.find('Col').length).toBe(3);
		expect(output.find('Icon').length).toBe(2);
	});

	it('edits', () => {
		const editClickHandler = sinon.spy();
		const output = shallow(<Container container={getFakeContainer()} editClickHandler={editClickHandler} />);
		const editContainer = output.find('.edit-container');
		editContainer.simulate('click');
		expect(editClickHandler.calledOnce).toBe(true);
	});	

	it('deletes', () => {
		const deleteClickHandler = sinon.spy();
		const output = shallow(<Container container={getFakeContainer()} deleteClickHandler={deleteClickHandler} />);
		const deleteContainer = output.find('.delete-container');
		deleteContainer.simulate('click');
		expect(deleteClickHandler.calledOnce).toBe(true);
	});	



});

describe('Containers', () => {
	it ('renders', () => {
		const containers = { items: [getFakeContainer(), getFakeContainer()] };
		const output = shallow(<Containers containers={containers} />);
	});

	xit('decorates', () => {
		const dispatch = sinon.spy();
		const output = mount(<DecoratedContainers dispatch={dispatch} store={mockStore(state)} />);
		expect(dispatch.calledOnce).toBe(true);
		console.log(output.debug());

	});	

	it('maps state to props', () => {
		const state = { containers: {} };
		const props = mapStateToProps(state);
		expect(props).toEqual(state);
	});

	it('maps dispatch to props', () => {
		const dispatch = sinon.spy();
		const props = mapDispatchToProps(dispatch);
		// console.log(props);
		expect('dispatch' in props).toBe(true);
		expect('containerAddClickHandler' in props).toBe(true);
		expect('containerEditClickHandler' in props).toBe(true);
		expect('containerDeleteClickHandler' in props).toBe(true);
	});
});
