import React from 'react';
import { shallow } from 'enzyme';

import { getFakeCategories, getFakeContainer } from './fakes'

import Container from '../../../../src/components/pages/Items/Container';

describe('Container', () => {

  it('works', () => {
  	const container = getFakeContainer(getFakeCategories(2, 2));
  	const output = shallow(<Container {...container} />);
  	const h4s = output.find('h4');
  	expect(h4s.get(0).props.children).toBe(container.categories[0].name);
  	expect(h4s.get(1).props.children).toBe(container.categories[1].name);
  	const items = output.find('Item');
  	for (let i = 0; i < items.length; i++) {
  		const props = items.get(i).props;
  		const item = container.categories[i > 1 ? 1 : 0].items[i % 2];
  		expect(props.name).toBe(item.name);
  	}
  });

  it('returns null if no categories', () => {
  	const output = shallow(<Container  />);
  	expect(output.node).toBe(null);
  });

  it('shows a spinner when loading', () => {
  	const output = shallow(<Container categories={[]} loading={true} />);
  	const h2 = output.find('h2');
  	expect(h2.length).toBe(1);
  	expect(h2.find('Spinner').length).toBe(1);
  });

  it('shows a welcome if categories is empty', () => {
  	const name = 'foo';
  	const output = shallow(<Container categories={[]} name={name} />);
  	expect(output.is('ContainerWelcome'));
  	expect(output.props().name).toBe(name);
  });

});