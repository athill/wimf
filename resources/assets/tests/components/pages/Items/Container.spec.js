import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';

import { getFakeCategories, getFakeContainer } from '../../../testUtil/fakes';

import Container from '../../../../src/components/pages/Items/Container';
import { loadingStates } from '../../../../src/redux/modules/utils';

describe('Container', () => {

  it('works', () => {
    const numContainers = 2;
    const numItems = 2;
  	const container = getFakeContainer(getFakeCategories(numContainers, numItems));
  	const output = shallow(<Container {...container} />);
  	const h4s = output.find('h4');
    h4s.forEach((h4, index) => {
      expect(h4.props().children).toBe(container.categories[index].name);
    });
  	const items = output.find('Item');
    items.forEach((item, index) => {
      const actual = item.props().name;
      const containerIndex = Math.floor(index/numItems);
      const itemIndex = index % numItems;
      const expected = container.categories[containerIndex].items[itemIndex].name;
      expect(actual).toBe(expected);
    });
  });

  it('returns null if no categories', () => {
  	const output = shallow(<Container  />);
  	expect(output.node).toBe(null);
  });

  it('shows a spinner when loading', () => {
  	const output = shallow(<Container categories={[]} loading={loadingStates.LOADING} />);
  	const h2 = output.find('h2');
  	expect(h2.length).toBe(1);
  	expect(h2.find('Spinner').length).toBe(1);
  });

  it('shows a welcome if categories is empty', () => {
  	const name = 'foo';
  	const output = shallow(<Container categories={[]} name={name}  loading={loadingStates.COMPLETE}/>);
  	expect(output.is('ContainerWelcome'));
  	expect(output.props().name).toBe(name);
  });

  it('hides empty categories', () => {
    const noItemsIndex = 1;
    let categories = getFakeCategories(3, 1);
    categories[noItemsIndex].items = [];
    const allCategoryNames = categories.map(category => category.name);
    const output = shallow(<Container categories={categories} />);
    const displayedCategoryNames = output.find('h4').map(category => category.text());
    allCategoryNames.forEach((categoryName, index) => {
      if (index === noItemsIndex) {
        expect(displayedCategoryNames).toNotInclude(categoryName);
      } else {
        expect(displayedCategoryNames).toInclude(categoryName);  
      }
      
    });
  });
});
