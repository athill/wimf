import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';

import {Icon} from '../../common/common';
import { getSortedContainerArray, sortByNameKey } from '../../../util/ContainerOperations';
import IconMenu, { MenuItem } from '../../common/IconMenu';
import { showDeleteContainerForm, showEditContainerForm } from '../../../redux/modules/containers';

const triggerLabel = <Icon icon="cog" style={{ fontSize: '1em' }} />;
const ConfigMenu = ({ container, editContainer, deleteContainer }) => (
	<IconMenu triggerLabel={triggerLabel} className="icon-menu">
		<MenuItem onClick={ e => { e.preventDefault(); editContainer(container); }}>Edit</MenuItem>
		{ deleteContainer && <MenuItem onClick={ e => { e.preventDefault(); deleteContainer(container); }}>Delete</MenuItem> }
	</IconMenu>
);
ConfigMenu.displayName = 'ConfigMenu';


const ContainerTab = ({ active, container, editContainer, deleteContainer }) => (
	<div style={{ whiteSpace: 'nowrap' }}>{  container.name } { active && <ConfigMenu container={container} editContainer={editContainer} deleteContainer={deleteContainer} /> }</div>
);
ContainerTab.displayName = 'ContainerTab';


const ContainerSelector = ({containers, editContainer, deleteContainer, handleSelect, selectedId }) => {
	const containerArray = getSortedContainerArray(containers);
	const deleteContainerHandler = containerArray.length > 1 ? deleteContainer : null;
	return (
			<Nav bsStyle="tabs" activeKey={parseInt(selectedId)} onSelect={handleSelect}>
				{
					containerArray.map(container => {
						return (
							<NavItem key={container.id} eventKey={container.id} title={ container.description || null }>
								<ContainerTab	
									active={parseInt(container.id) === parseInt(selectedId)}
									container={container}  
									editContainer={editContainer}
									deleteContainer={deleteContainerHandler}
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