import React from 'react';
import { Col, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

export const InputField = ({
	  input,
	  label,
	  meta: { touched, error, warning },
	  type='text'
	}) => (
	<FormGroup controlId={input.id || input.name}>
		<Col componentClass={ControlLabel} md={4}>
			{label}:
		</Col>
		<Col md={4}>
			<FormControl {...input} type={type} />
			{ touched && error && <div style={{color: 'red'}}>{ error }</div> }
		</Col>
	</FormGroup>
);