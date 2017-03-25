import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
// import Menu from 'react-menu';

import {Icon} from '../../common/common';
import IconMenu, { MenuItem } from '../../common/IconMenu';

const triggerLabel = <Icon icon="cog" style={{ fontSize: '0.8em' }} />;
const ConfigMenu = ({ id }) => (
	<IconMenu triggerLabel={triggerLabel}>
		<MenuItem onClick={ e => console.log('edited', id)}>Edit</MenuItem>
		<MenuItem onClick={ e => console.log('deleted', id)}>Delete</MenuItem>
	</IconMenu>
);


const ContainerTab = ({ container }) => (
	<NavItem eventKey={container.id} title={ container.description }>
		<div style={{ whiteSpace: 'nowrap' }}>{  container.name } <ConfigMenu id={container.id} /></div>
	</NavItem>
);

const ContainerSelector = ({containers, handleSelect}) => {
	const selected = containers.selected ? containers.selected.id : null;
	return (
			<Nav bsStyle="tabs" activeKey={selected} onSelect={handleSelect}>
				{
					containers.items.map(container => {
						return (
							<ContainerTab container={container} key={container.id} />
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