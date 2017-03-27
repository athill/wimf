import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
// import Menu from 'react-menu';

import {Icon} from '../../common/common';
import IconMenu, { MenuItem } from '../../common/IconMenu';

const triggerLabel = <Icon icon="cog" style={{ fontSize: '1em' }} />;
const ConfigMenu = ({ id }) => (
	<IconMenu triggerLabel={triggerLabel} className="icon-menu">
		<MenuItem onClick={ e => console.log('edited', id)}>Edit</MenuItem>
		<MenuItem onClick={ e => console.log('deleted', id)}>Delete</MenuItem>
	</IconMenu>
);


const ContainerTab = ({ active, container }) => (
	<div style={{ whiteSpace: 'nowrap' }}>{  container.name } { active && <ConfigMenu id={container.id} /> }</div>
);


const ContainerSelector = ({containers, handleSelect}) => {
	const selected = containers.selected ? containers.selected.id : null;
	return (
			<Nav bsStyle="tabs" activeKey={selected} onSelect={handleSelect}>
				{
					containers.items.map(container => {
						return (
							<NavItem key={container.id} eventKey={container.id} title={ container.description }>
								<ContainerTab 
									container={container}  
									active={container.id === selected}
									/>
							</NavItem>
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