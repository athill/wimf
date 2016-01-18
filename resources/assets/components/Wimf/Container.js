import React from 'react';

import { connect } from 'react-redux';

function mapStateToProps(state) {
  return { items: state.items }
}

const Item = ({name, quantity, measurement}) => (
	<div className="card-block">
    	<h4 className="card-title">{ name }</h4>
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