import _ from 'lodash';
import React from 'react';
import { Row, Col, Navbar, Nav, NavItem } from 'react-bootstrap';

//// components
import ContainerWelcome from './ContainerWelcome';
import Item from './Item';



const Container = ({ categories, name, itemDeleteClickHandler, itemEditClickHandler }) => {
	if (!categories) {
		return <noscript />;
	} else if (categories.length === 0) {
		return <ContainerWelcome name={name} />;
	}
	return (
		<div id='categories'>
		{
			categories.map((category) => (
				<div key={category.name}>
					<h4>{category.name}</h4>
					{
						_.chunk(category.items, 4).map((items, i) => (
							<Row key={i}>
								{
									items.map(item => (
										<Col md={3} sm={6} key={item.name}>
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