import React from 'react';
import { Panel } from 'react-bootstrap';

//// components
import { Icon } from '../common/common';

//// utils
import { getDisplayFormat } from '../../util/DateUtils';

const Item = ({editClickHandler = e => e, deleteClickHandler = e => e, ...item}) => {
	const header = 	(<div className='clearfix'>
    		<h4 className="card-title">{ item.name }</h4>
    		<div className='card-navbar'>
    			<Icon icon='edit' title={`Edit ${item.name}`} onClick={e => editClickHandler(item)} />
    			<Icon icon='remove' title={`Delete ${item.name}`} onClick={e => deleteClickHandler(item)} />
    		</div>
    	</div>);
	return (<Panel header={header} className='card-block'>
    		{ item.quantity } { item.measurement } {getDisplayFormat(item.date)}
    		</Panel>);
};
Item.propTypes = {
    editClickHandler: React.PropTypes.func,
    deleteClickHandler: React.PropTypes.func,
};

export default Item;