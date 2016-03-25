import React from 'react';
import { Input } from 'react-bootstrap';

const ContainerSelector = ({containers}) => (
	<form className="form-horizontal">
		<Input type='select' label='Container:' className='component-selector'
			labelClassName="col-md-2 component-selector-label" wrapperClassName="col-md-10">
		{
			containers.items.map(container => {
				const selected = container.id === containers.selected.id;
				return (
					<option selected={selected} value={container.id} key={container}>
						{ container.name }
					</option>
				);
			})
		}
		</Input> 
	</form>
);

export default ContainerSelector;