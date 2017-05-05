import React from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

const Filter = ({ handleChange }) => (
	<form className="form-horizontal" onSubmit={ e => e.preventDefault() }>
		<FormGroup className="item-filter" controlId="items-filter">
				<ControlLabel className="col-xs-2">Filter:</ControlLabel>
				<div className='col-xs-10'>
					<FormControl type='text' componentClass="input"
						onChange={e => handleChange(e.target.value)} />
				</div>
			</FormGroup>
	</form>
);
Filter.displayName = 'Filter';
Filter.propTypes = {
	handleChange: React.PropTypes.func
};

export default Filter;