import _ from 'lodash';
import React from 'react';
import { Row, Col, Navbar, Nav, NavItem } from 'react-bootstrap';

//// components
import Item from './Item';


const Container = ({ categories, name, itemDeleteClickHandler, itemEditClickHandler }) => {
	if (!categories) {
		return <noscript />;
	}
	return (
		<div>
		<h3>{name}</h3>
		{
			categories.map(category => (
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



export default Container;