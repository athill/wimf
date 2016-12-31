import React from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

const ContainerSelector = ({containers, onChange}) => {
	const selected = containers.selected ? containers.selected.id : '';
	return (<form className="form-horizontal">
		<FormGroup>
			<ControlLabel className='col-md-2 component-selector-label'>Container:</ControlLabel>
			<div className='col-md-10'>		
				<FormControl type='select' className='component-selector' componentClass='select'
					defaultValue={selected} onChange={onChange}>
				{
					containers.items.map(container => {
						return (
							<option value={container.id} key={container.id}>
								{ container.name }
							</option>
						);
					})
				}
				</FormControl> 
			</div>
		</FormGroup>		
	</form>)
};

export default ContainerSelector;