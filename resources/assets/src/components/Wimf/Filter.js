import React from 'react';
import { Input } from 'react-bootstrap';

const Filter = ({handleChange = e => e}) => (
	<form className="form-horizontal" onSubmit={ e => e.preventDefault() }>
		<Input type='text' label='Filter:' className='component-selector'
			labelClassName="col-md-2 component-selector-label" wrapperClassName="col-md-10"
			onChange={e => handleChange(e.target.value)} />
	</form>
);
Filter.propTypes = {
	handleChange: React.PropTypes.func
};



export default Filter;