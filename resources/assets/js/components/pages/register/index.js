import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, Panel, Row } from 'react-bootstrap';

import { register } from '../../../modules/user';

const InputField = ({
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

const validate = values => {
	const errors = {};
	// if (!values.name) {
	// 	errors.name = "Name is required";
	// }
	// if (!values.email) {
	// 	errors.email = "Email is required";
	// } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
 //    	errors.email = 'Invalid email address'
 //  	}
	// if (!values.password) {
	// 	errors.password = "Password is required";
	// }
	// if (values.password !== values.password_confirmation) {
	// 	errors.password_confirmation = "Confirm password must match Password";
	// }
	return errors;
};

const submit = (values, dispatch) => {
	return new Promise((resolve, reject) => dispatch(register(values, resolve, reject)))
		// .catch(error => {
		// 	console.log('error is', error);
		// 	throw new SubmissionError(error);
		// });

};

const Register = ({ error, handleSubmit, invalid, pristine, reset, submitting }) => {
	console.log(error);
	return (
	<Grid fluid>
		<Row>
			<Col md={8} mdOffset={2}>	
				<Panel header="Register" bsStyle="default">

					<form className="form-horizontal" onSubmit={handleSubmit(submit)}>
						<Field label="Name" name="name" component={InputField} autofocus maxLength={255} />
						<Field label="Email" name="email" type="email" component={InputField} />
						<Field label="Password" name="password" type="password" component={InputField} />
						<Field label="Confirm Password" name="password_confirmation" type="password" component={InputField} />
						{ error && <Alert bsStyle="danger">{ error }</Alert> }
						<FormGroup>
							<Col md={4} mdOffset={4}>
								<Button type="submit" disabled={submitting || invalid}>Register</Button>
								<Button type="button" disabled={pristine || submitting} onClick={reset}>Clear</Button>
							</Col>
						</FormGroup>												
					</form>
				</Panel>
			</Col>
		</Row>
	</Grid>				
)};

export default reduxForm({
  form: 'register', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(Register);
