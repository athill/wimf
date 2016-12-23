import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import ContainerSelector from '../../../src/components/Wimf/ContainerSelector';

describe('ContainerSelector', () => {
  it('works', () => {
  	const output = shallow(<ContainerSelector containers={ { items: [] } } onChange={e => e} />);
  	expect(output.find('form').length).toBe(1);
  });
});