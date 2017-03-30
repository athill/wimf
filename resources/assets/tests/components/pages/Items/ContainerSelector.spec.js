import React from 'react';
import { shallow } from 'enzyme';

import { getFakeContainers } from './fakes'

import ContainerSelector from '../../../../src/components/pages/Items/ContainerSelector';

describe('ContainerSelector', () => {

  it('works', () => {
  	const containers = getFakeContainers(2);
  	const output = shallow(<ContainerSelector onChange={e => e} containers={containers} />);
  	const options = output.find('NavItem');

    // console.log(options.debug());
  	expect(options.length).toBe(3);
  	containers.items.forEach((container, i) => {
  		const option = options.get(i);
      const containerTab = option.props.children;
      // expect(containerTab.type.displayName).toBe('ContainerTab');
      expect(option.props.eventKey).toBe(container.id);
      expect(containerTab.props.container.name).toBe(container.name);   
  	});
    expect(options.get(options.length - 1).props.eventKey).toBe('add-container');

  });
});
