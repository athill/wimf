import React from 'react';
import expect from 'expect';
import ReactTestUtils from 'react-addons-test-utils';

import BootstrapContainer from '../../../components/common/BootstrapContainer';

describe('BootstrapContainer', () => {
  it('works', () => {
  	const renderer = ReactTestUtils.createRenderer();
  	renderer.render(<BootstrapContainer />);
  	const result = renderer.getRenderOutput();
 
    expect(true).toBe(true);
  });
});