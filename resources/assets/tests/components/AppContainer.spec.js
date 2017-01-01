import React from 'react';
import { shallow } from 'enzyme';

import AppContainer from '../../src/components/AppContainer';

describe('AppContainer', () => {
  it('works', () => {
  	const output = shallow(<AppContainer>foo</AppContainer>);
  	const main = output.find('main');
  	expect(main.length).toBe(1);
  	const container = main.find('.container');
  	expect(container.length).toBe(1);
  	const col = container.find('.col-md-12');
  	expect(col.length).toBe(1);
    expect(col.children().nodes).toEqual(['foo']);
  });
});