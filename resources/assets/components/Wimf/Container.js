import React from 'react';

import { connect } from 'react-redux';

import { Icon } from '../common/common';

function mapStateToProps({ items }) {
  return { items };
}

const Item = ({name, quantity, measurement}) => (
	<div className="card-block">
		<div className='card-header'>
    		<h4 className="card-title">{ name }</h4>
    		<div className='card-navbar'>
    			<Icon icon='edit' className='card-edit' />
    			<Icon icon='remove' className='card-delete' />
    		</div>
    	</div>
    	<p className="card-text">
    		{ quantity } { measurement }
    	</p>
    </div>
);

const Containers = ({ items }) => {
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
							return <Item {...item}/>
						})
					}
				</div>
			))			
		}
		</div>
	);

}



export default connect(mapStateToProps)(Containers);