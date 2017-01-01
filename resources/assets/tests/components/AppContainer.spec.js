import React from 'react';
import expect from 'expect';
import ReactTestUtils from 'react-addons-test-utils';

import AppContainer from '../../src/components/AppContainer';

describe('AppContainer', () => {
  it('works', () => {
  	const renderer = ReactTestUtils.createRenderer();
  	renderer.render(<AppContainer />);
  	const result = renderer.getRenderOutput();
 	// console.log(result);
    expect(true).toBe(true);
  });
});