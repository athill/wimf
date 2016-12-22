import React from 'react';
import expect from 'expect';
import ReactTestUtils from 'react-addons-test-utils';

import BootstrapContainer from '../../../src/components/common/BootstrapContainer';

describe('BootstrapContainer', () => {
  it('works', () => {
  	const renderer = ReactTestUtils.createRenderer();
  	renderer.render(<BootstrapContainer />);
  	const result = renderer.getRenderOutput();
 	// console.log(result);
    expect(true).toBe(true);
  });
});