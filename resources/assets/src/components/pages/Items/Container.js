import _ from 'lodash';
import React from 'react';
import { Row, Col } from 'react-bootstrap';

//// components
import ContainerWelcome from './ContainerWelcome';
import Item from './Item';
import { Spinner } from '../../common/common';



const Container = ({ categories, name, itemDeleteClickHandler, itemEditClickHandler, loading }) => {
	if (!categories) {
		return null;
	} 
	if (loading) {
		return (
			<h2 className='text-primary'>
				<Spinner /> Retrieving your items ...
			</h2>
		);
	}
	if (categories.length === 0) {
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
										<Col xs={12} sm={9} md={6} lg={3} key={item.name}>
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
Container.displayName = 'Container';


export default Container;
