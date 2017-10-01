import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Alert, Button, Col, Form, FormGroup, Grid, Panel, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { login } from '../../../modules/user';
import { InputField } from '../../util/form';

const validate = values => {
	const errors = {};
	// if (!values.email) {
	// 	errors.email = "Email is required";
	// } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
 //    	errors.email = 'Invalid email address'
 //  	}
	// if (!values.password) {
	// 	errors.password = "Password is required";
	// }
	return errors;
};

const submit = (values, dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch(login(values))
			.catch(error => reject(new SubmissionError(error)));
	});
};

const Login = ({ error, handleSubmit, invalid, pristine, reset, submitting }) => (
	<Grid fluid>
		<Row>
			<Col md={6}>
				<Panel header="New Here?" bsStyle="success">
					<p><strong>What's in my Freezer?</strong> is a simple inventory application. It was inspired by going 
					to the grocery store and buying things that were already in my freezer.</p>
					<p>It had to be simple, or I wouldn't use it. Hence, it is mostly just adding, editing, and removing items.</p>
					<p>I do have some things planned, such as multiple containers, tags, advanced search, etc.</p>
					<p>There is no "sharing" option. What&apos;s in your freezer is between you and the database</p>
					<p><strong>To get started</strong>, 
						check out the <a href="/demo" target='_blank'>demo</a> (data stored   
						<a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank">locally</a>) 
						or <Link to="/register">register</Link>.
					</p>					
				</Panel>
			</Col>
			<Col md={6}>
				<Panel header="Login" bsStyle="default">
					<Form horizontal onSubmit={handleSubmit(submit)}>
						<Field label="Email" name="email" type="email" component={InputField} autofocus />
						<Field label="Password" name="password" type="password" component={InputField} />

						<FormGroup>
							<Col md={6} mdOffset={4}>
								<div className="checkbox">
									<label>
										<input type="checkbox" name="remember" /> Remember Me
									</label>
								</div>
							</Col>
						</FormGroup>
						{ error && <Alert bsStyle="danger">{ error }</Alert> }
						<FormGroup>
							<Col md={6} mdOffset={4}>
								<Button type="submit" bsStyle="primary">Login</Button>

								<a className="btn btn-link" href="/password/email">Forgot Your Password?</a>
							</Col>
						</FormGroup>
					</Form>
				</Panel>
			</Col>
		</Row>
	</Grid>
);

export default reduxForm({
  form: 'login', // a unique identifier for this form
  validate
})(Login);