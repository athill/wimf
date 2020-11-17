import React from 'react';
import { Field, reduxForm} from 'redux-form';
import { Alert, Col, Form, FormGroup, Grid, Panel, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import { InputField, required, submit, validEmail } from '../../util/form';
import { passwordReset } from '../../../modules/user';

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

const PasswordReset = ({ error, handleSubmit, status }) => (
	<Grid fluid>
		{ status && <Alert bsStyle="success">{ status }</Alert> }
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

const mapStateToProps = ({ user: { passwordResetStatus: status } }) => {
	return {
		status
	};
};

export default connect(mapStateToProps)(reduxForm({
  form: 'password-reset', // a unique identifier for this form
  validate
})(PasswordReset));
