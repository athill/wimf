import React from 'react';
import { Input } from 'react-bootstrap';

const ContainerSelector = ({containers, onChange}) => {
	const selected = containers.selected ? containers.selected.id : '';
	return (<form className="form-horizontal">
		<Input type='select' label='Container:' className='component-selector'
			labelClassName="col-md-2 component-selector-label" wrapperClassName="col-md-10" defaultValue={selected} 
			onChange={onChange}>
		{
			containers.items.map(container => {
				return (
					<option value={container.id} key={container.id}>
						{ container.name }
					</option>
				);
			})
		}
		</Input> 
	</form>)
};

export default ContainerSelector;