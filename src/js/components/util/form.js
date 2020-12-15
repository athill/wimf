import React from 'react';
import { Col, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { SubmissionError } from 'redux-form';

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

export const validEmail = email => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export const required = (fields, values) => fields.filter(field => !values[field]);

export const submit = submitter => (values, dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch(submitter(values))
			.catch(error => {
				reject(new SubmissionError(error));
			});
	});
};