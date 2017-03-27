import React from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

const Filter = ({ handleChange }) => (
	<form className="form-inline" onSubmit={ e => e.preventDefault() }>
		<FormGroup className="item-filter" controlId="items-filter">
			<ControlLabel>Filter:</ControlLabel>
			<FormControl type='text' componentClass='input'
				onChange={e => handleChange(e.target.value)} />
			
			</FormGroup>
	</form>
);
Filter.displayName = 'Filter';
Filter.propTypes = {
	handleChange: React.PropTypes.func
};

export default Filter;
