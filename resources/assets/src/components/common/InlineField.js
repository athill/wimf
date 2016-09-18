import React from 'react';
import { Input } from 'react-bootstrap';


const InlineField = ({ id, label, type='text', error, ...other }) => {
	const errorMessage = error && <div style={{ color: 'red' }}>{error}</div>;
	return (
		<span style={{ display: 'inline-block', verticalAlign: 'top' }}>
			<label for={id} className='sr-only'>{label}</label>
			<input id={id} type={type} placeholder={label} {...other} />
			{ errorMessage }
		</span>
	);
};

export default InlineField;