import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Alert, Button, Col, Form, FormGroup, Grid, Panel, Row } from 'react-bootstrap';

import { InputField, required, submit, validEmail } from '../../util/form';

const validate = values => {
	const errors = {};
	const requiredErrors = required(['email'], values);
	if (requiredErrors.length) {
		requiredErrors.forEach(field => errors[field] = `${field} is required`);
		return errors;
	}
	if (!validEmail(values.email)) {
    	errors.email = 'Invalid email address'
  	}
	return errors;
};

const passwordReset = () => {};

const PasswordReset = ({ error, handleSubmit }) => (
	<Grid fluid>
		<Row>
			<Col md={8} mdOffset={2}>
				<Panel header="Reset Password" bsStyle="default">
					<Form horizontal onSubmit={handleSubmit(submit(passwordReset))}>
						<Field label="Email" name="email" type="email" component={InputField} autoFocus />
						{ error && <Alert bsStyle="danger">{ error }</Alert> }
						<FormGroup>
							<div className="col-md-6 col-md-offset-4">
								<button type="submit" className="btn btn-primary">
									Send Password Reset Link
								</button>
							</div>
						</FormGroup>
					</Form>
				</Panel>
			</Col>
		</Row>
	</Grid>
);

export default reduxForm({
  form: 'password-reset', // a unique identifier for this form
  validate
})(PasswordReset);
