import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';

import {Icon} from '../../common/common';

const ContainerSelector = ({containers, handleSelect}) => {
	const selected = containers.selected ? containers.selected.id : null;
	return (
			<Nav bsStyle="tabs" activeKey={selected} onSelect={handleSelect}>
				{
					containers.items.map(container => {
						return (
							<NavItem eventKey={container.id} key={container.id} >{  container.name }</NavItem>
						);
					})
				}
				<NavItem eventKey="add-container" key="add-container" id="add-container-tab">
					<Icon icon='plus' />
				</NavItem>
			</Nav>
	);
};

ContainerSelector.displayName = 'ContainerSelector';

export default ContainerSelector;