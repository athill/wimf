import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
// import Menu from 'react-menu';

import {Icon} from '../../common/common';
import IconMenu, { MenuItem } from '../../common/IconMenu';
import { showDeleteContainerForm, showEditContainerForm } from '../../../redux/modules/containerForm';

const triggerLabel = <Icon icon="cog" style={{ fontSize: '1em' }} />;
const ConfigMenu = ({ container, editContainer, deleteContainer }) => (
	<IconMenu triggerLabel={triggerLabel} className="icon-menu">
		<MenuItem onClick={ e => { e.preventDefault(); editContainer(container); }}>Edit</MenuItem>
		<MenuItem onClick={ e => { e.preventDefault(); deleteContainer(container); }}>Delete</MenuItem>
	</IconMenu>
);


const ContainerTab = ({ active, container, editContainer, deleteContainer }) => (
	<div style={{ whiteSpace: 'nowrap' }}>{  container.name } { active && <ConfigMenu container={container} editContainer={editContainer} deleteContainer={deleteContainer} /> }</div>
);


const ContainerSelector = ({containers, editContainer, deleteContainer, handleSelect }) => {
	const selected = containers.selected ? containers.selected.id : null;
	return (
			<Nav bsStyle="tabs" activeKey={selected} onSelect={handleSelect}>
				{
					containers.items.map(container => {
						return (
							<NavItem key={container.id} eventKey={container.id} title={ container.description || null }>
								<ContainerTab	
									active={container.id === selected}
									container={container}  
									editContainer={editContainer}
									deleteContainer={deleteContainer}
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