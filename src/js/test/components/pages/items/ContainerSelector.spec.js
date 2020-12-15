import React from 'react';
import { shallow } from 'enzyme';

import { getFakeCategories, getFakeContainers } from '../../../testUtil/fakes';

import { sortByNameKey } from '../../../../util/ContainerOperations';
import ContainerSelector from '../../../../components/pages/items/ContainerSelector';

describe('ContainerSelector', () => {

  it('works', () => {
  	const containers = getFakeContainers(2);
  	const output = shallow(<ContainerSelector onChange={e => e} containers={containers} />);
  	const options = output.find('NavItem');
  	expect(options.length).toBe(3);
    const containerArray = Object.keys(containers).map(id => containers[id]);
    // console.log(containerArray);
    containerArray.sort(sortByNameKey);    
  	containerArray.forEach((container, i) => {
  		const option = options.get(i);
      const containerTab = option.props.children;
      // console.log(container, option);
      // expect(containerTab.type.displayName).toBe('ContainerTab');
      expect(option.props.eventKey).toBe(container.id);
      expect(containerTab.props.container.name).toBe(container.name);   
  	});
    expect(options.get(options.length - 1).props.eventKey).toBe('add-container');

  });
});
