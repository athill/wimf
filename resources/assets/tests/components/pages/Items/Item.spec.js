import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';
import sinon from 'sinon';

import Item, { ItemHeader } from '../../../../src/components/pages/Items/Item';

describe('Item', () => {
	const name = faker.lorem.words();
	const quantity = faker.random.number();
	const date = '2016-01-02';
	const displayDate = '01/02/2016';
	it('works', () => {
		const output = shallow(<Item name={name} quantity={quantity} date={date} />);
		expect(output.is('Panel')).toBe(true);
		const cols = output.find('Col');
		expect(cols.get(0).props.children).toBe(quantity);
		expect(cols.get(1).props.children).toBe(displayDate);
	});

	describe('ItemHeader', () => {
		it('works', () => {
			const output = shallow(<ItemHeader name={name} />);
			const h4 = output.find('h4');
			expect(h4.length).toBe(1);
			expect(h4.children().node).toBe(name);
			expect(output.find('Icon').length).toBe(2);
		});

		it('handles edit click', () => {
			const editClickHandler = sinon.spy();
			const output = shallow(<ItemHeader name={name} editClickHandler={editClickHandler} />);
			const editIcon = output.find('.edit-button');
			editIcon.simulate('click');
			expect(editClickHandler.calledOnce).toBe(true);
		});

		it('handles delete click', () => {
			const deleteClickHandler = sinon.spy();
			const output = shallow(<ItemHeader name={name} deleteClickHandler={deleteClickHandler} />);
			const deleteIcon = output.find('.delete-button');
			deleteIcon.simulate('click');
			expect(deleteClickHandler.calledOnce).toBe(true);
		});

	});
});
