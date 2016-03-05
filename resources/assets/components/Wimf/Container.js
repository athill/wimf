import React from 'react';
import { connect } from 'react-redux';

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
	return (<div className="card-block">
		<div className='card-header'>
    		<h4 className="card-title">{ item.name }</h4>
    		<div className='card-navbar'>
    			<Icon icon='edit' title={`Edit ${item.name}`} onClick={e => editClickHandler(item)} />
    			<Icon icon='remove' title={`Delete ${item.name}`} onClick={e => deleteClickHandler(item)} />
    		</div>
    	</div>
    	<p className="card-text">
    		{ item.quantity } { item.measurement }
    	</p>
    </div>);
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
						category.items.map(item => {
							return <Item {...item} 
										deleteClickHandler={itemDeleteClickHandler} 
										editClickHandler={itemEditClickHandler} />;
						})
					}
				</div>
			))			
		}
		</div>
	);

}



export default connect(mapStateToProps, mapDispatchToProps)(Containers);