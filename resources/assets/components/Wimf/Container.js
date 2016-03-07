import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Panel, Navbar, Nav, NavItem } from 'react-bootstrap';

//// components
import { Icon } from '../common/common';
//// actions
import { showDeleteItemForm, showEditItemForm } from '../../actions/itemForm';

const mapStateToProps = ({ items }) => {
  return { items };
};

const mapDispatchToProps = (dispatch) => {
	return {
		itemEditClickHandler: (item) => {
			dispatch(showEditItemForm(item));
		},				
		itemDeleteClickHandler: (item) => {
			dispatch(showDeleteItemForm(item));
		},
	};
};

const Item = ({editClickHandler, deleteClickHandler, ...item}) => {
	const header = 	(<div className='clearfix'>
    		<h4 className="card-title">{ item.name }</h4>
    		<div className='card-navbar'>
    			<Icon icon='edit' title={`Edit ${item.name}`} onClick={e => editClickHandler(item)} />
    			<Icon icon='remove' title={`Delete ${item.name}`} onClick={e => deleteClickHandler(item)} />
    		</div>
    	</div>);
	return (<Panel header={header} className='card-block'>
    		{ item.quantity } { item.measurement }
    		</Panel>);
};


const Containers = ({ items, itemDeleteClickHandler, itemEditClickHandler }) => {
	if (! items || ! items.categories) {
		return <noscript />;
	}
	return (
		<div>
		<h3>{items.name}</h3>
		{
			items.categories.map(category => (
				<div>
					<h4>{category.name}</h4>
					{
						_.chunk(category.items, 4).map(items => (
							<Row>
								{
									items.map(item => (
										<Col md={3} sm={6}>
											<Item {...item} 
												deleteClickHandler={itemDeleteClickHandler} 
												editClickHandler={itemEditClickHandler} />
										</Col>
									))
								}
							</Row>
						))
					}
				</div>
			))			
		}
		</div>
	);

}



export default connect(mapStateToProps, mapDispatchToProps)(Containers);