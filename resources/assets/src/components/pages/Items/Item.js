import PropTypes from 'prop-types';
import React from 'react';
import { Col, Panel, Row } from 'react-bootstrap';

//// components
import { Icon } from '../../common/common';

//// utils
import { getDisplayFormat } from '../../../util/DateUtils';

export const ItemHeader = ({editClickHandler, deleteClickHandler, ...item}) => (
    <Row>
        <Col xs={8} className="card-title">
            <h4>{ item.name }</h4>
        </Col>
        <Col xs={4} className='card-navbar'>
            <Icon icon='edit' className='edit-button' title={`Edit ${item.name}`} onClick={e => editClickHandler(item)} />
            <Icon icon='remove' className='delete-button' title={`Delete ${item.name}`} onClick={e => deleteClickHandler(item)} />
        </Col>
    </Row>
);

const Item = ({editClickHandler = e => e, deleteClickHandler = e => e, ...item}) => {
	const header = 	<ItemHeader editClickHandler={editClickHandler} deleteClickHandler={deleteClickHandler} {...item} />;
	return (<Panel header={header} className='card-block'>
                <Row>
                    <Col xs={8} className='item-quantity'>
                        { item.quantity }
                    </Col>
                    <Col xs={4} className='item-date'>
                        {getDisplayFormat(item.date)}
                    </Col> 
                </Row>
    		</Panel>);
};
Item.displayName = 'Item';
Item.propTypes = {
    editClickHandler: PropTypes.func,
    deleteClickHandler: PropTypes.func,
};

export default Item;