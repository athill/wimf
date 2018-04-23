import PropTypes from 'prop-types';
import React from 'react';
import { Input } from 'react-bootstrap';


const InlineField = ({ error, id, label, type='text', ...other }) => {
	const errorMessage = error && <div style={{ color: 'red' }}>{error}</div>;
	return (
		<span style={{ display: 'inline-block', verticalAlign: 'top' }}>
			<label htmlFor={id} className='sr-only'>{label}</label>
			<input id={id} type={type} placeholder={label} {...other} />
			{ errorMessage }
		</span>
	);
};
InlineField.displayName = 'InlineField';
InlineField.propTypes = {
	error: PropTypes.string,
	id: PropTypes.string,
	label: PropTypes.string,
	type: PropTypes.string
};

export default InlineField;