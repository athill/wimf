import React from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

const Filter = ({handleChange = e => e}) => (
	<form className="form-horizontal" onSubmit={ e => e.preventDefault() }>
		<FormGroup>
			<ControlLabel className='col-md-2 component-selector-label'>Filter:</ControlLabel>
			<div className='col-md-10'>
				<FormControl type='text' label='Filter:' className='component-selector' componentClass='input'
					onChange={e => handleChange(e.target.value)} />
			</div>
			</FormGroup>
	</form>
);
Filter.propTypes = {
	handleChange: React.PropTypes.func
};



export default Filter;