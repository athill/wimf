import React from 'react';
import { Input } from 'react-bootstrap';


const InlineField = ({ id, label, type='text', ...other }) => {
	return (
		<span>
			<label for={id} className='sr-only'>{label}</label>
			<input id={id} type={type} placeholder={label} {...other} />
		</span>
	);
};

export default InlineField;