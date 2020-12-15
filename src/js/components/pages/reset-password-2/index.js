import React from 'react';
import { Field, reduxForm} from 'redux-form';
import { Alert, Button, Col, Form, Grid, Panel, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import { InputField, required, submit, validEmail } from '../../util/form';
import { passwordReset2 } from '../../../modules/user';

const validate = values => {
	const errors = {};
	const requiredErrors = required(['email', 'password'], values);
	if (requiredErrors.length) {
		requiredErrors.forEach(field => errors[field] = `${field} is required`);
		return errors;
	}
	if (!validEmail(values.email)) {
    	errors.email = 'Invalid email address'
  	}
	if (values.password !== values.password_confirmation) {
		errors.password_confirmation = "Confirm password must match Password";
	}  	
	return errors;
};


const PasswordReset2 = ({ error, handleSubmit, invalid, submitting }) => (
	<Grid fluid>
		<Row>
			<Col md={8} mdOffset={2}>
				<Panel header="Reset Password" bsStyle="default">
	                <Form horizontal onSubmit={handleSubmit(submit(passwordReset2))}>
						<Field type="hidden" name="token" component="input" />
						<Field label="Email" name="email" type="email" component={InputField} />
						<Field label="Password" name="password" type="password" component={InputField} />
						<Field label="Confirm Password" name="password_confirmation" type="password" component={InputField} />
						{ error && <Alert bsStyle="danger">{ error }</Alert> }
						<Col md={4} mdOffset={4}>
							<Button type="submit" disabled={submitting || invalid}>Reset Password</Button>
						</Col>
	                 </Form>
	            </Panel>
	        </Col>
	    </Row>
	</Grid>
);

const mapStateToProps = () => {
	const [ url, token ] = window.location.href.split('?');
	return {
		initialValues: {
			token: token || 'foo'
		}
	};
};

export default connect(mapStateToProps)(reduxForm({
  form: 'password-reset-2', // a unique identifier for this form
  validate
})(PasswordReset2));