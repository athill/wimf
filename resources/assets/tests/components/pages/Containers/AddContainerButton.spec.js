import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import AddContainerButton from '../../../../src/components/pages/Containers/AddContainerButton';

describe('AddContainerButton', () => {
	it('works', () => {
		const output = shallow(<AddContainerButton />);
		expect(output.is('Icon')).toBe(true);
		expect(output.props().title).toBe('Add Container');
	});

	it('handles click handler', () => {
		const clickHandler = sinon.spy();
		const output = shallow(<AddContainerButton clickHandler={clickHandler} />);
		output.simulate('click', { preventDefault: e => e });
		expect(clickHandler.calledOnce).toBe(true);
	});
});