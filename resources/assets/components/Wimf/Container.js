import React from 'react';

import { connect } from 'react-redux';

import { Icon } from '../common/common';

function mapStateToProps({ items }) {
  return { items };
};

const mapDispatchToProps = (dispatch) => {
	return {
		itemEditClickHandler: () => {
			alert('edit');
		},				
		itemDeleteClickHandler: () => {
			alert('delete');
		},
	};
};

const Item = ({name, quantity, measurement, editClickHandler, deleteClickHandler}) => (
	<div className="card-block">
		<div className='card-header'>
    		<h4 className="card-title">{ name }</h4>
    		<div className='card-navbar'>
    			<Icon icon='edit' title={`Edit ${name}`} onClick={editClickHandler} />
    			<Icon icon='remove' title={`Delete ${name}`} onClick={deleteClickHandler} />
    		</div>
    	</div>
    	<p className="card-text">
    		{ quantity } { measurement }
    	</p>
    </div>
);

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