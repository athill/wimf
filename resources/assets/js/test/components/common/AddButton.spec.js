import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
// import faker from 'faker';

import AddButton from '../../../components/common/AddButton';

describe('AddButton', () => {
	const title = 'foo';
	it('works', () => {
		const output = shallow(<AddButton title={title} />);
		const icon = output.find('Icon');
		expect(icon.length).toBe(1);
		const props = icon.props();
		expect(props.title).toBe(title);
		expect(props.id).toBe(title+'-button');
		expect(props.icon).toBe('plus-square');
		expect(props.size).toBe('3x');
	});

	it('clicks', () => {
		const clickHandler = sinon.spy();
		const output = shallow(<AddButton title={title} clickHandler={clickHandler} />);
		output.find('Icon').simulate('click', { preventDefault() {} });
		expect(clickHandler.calledOnce).toBe(true);
	});
});