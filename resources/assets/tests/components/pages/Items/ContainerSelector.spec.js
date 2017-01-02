import React from 'react';
import { shallow } from 'enzyme';

import { getFakeContainers } from './fakes'

import ContainerSelector from '../../../../src/components/pages/Items/ContainerSelector';

describe('ContainerSelector', () => {

  it('works', () => {
  	const containers = getFakeContainers(2);
  	const output = shallow(<ContainerSelector containers={ { items: [] } } onChange={e => e} containers={containers} />);
  	expect(output.find('form').length).toBe(1);
  	const options = output.find('option');
  	expect(options.length).toBe(2);
  	containers.items.forEach((container, i) => {
  		const option = options.get(i);
  		expect(option.props.value).toBe(container.id);
  		expect(option.props.children).toBe(container.name);
  	});

  });
});
