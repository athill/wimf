import React from'react'
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Alert, Button, Col, Form, FormGroup, Grid, Panel, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { login } from '../../../modules/user';
import { InputField, submit, validEmail } from '../../util/form';

const validate = values => {
	const errors = {};
	if (!values.email) {
		errors.email = "Email is required";
	} else if (!validEmail(values.email)) {
    	errors.email = 'Invalid email address'
  	}
	if (!values.password) {
		errors.password = "Password is required";
	}
	return errors;
};

export const LoginForm = ({ error, handleSubmit, invalid, pristine, reset, submitting }) => (
	<Form horizontal onSubmit={handleSubmit(submit(login))}>
		<Field label="Email" name="email" type="email" component={InputField} autoFocus />
		<Field label="Password" name="password" type="password" component={InputField} />

		<FormGroup>
			<Col md={6} mdOffset={4} className="checkbox">
				<label>
					<Field type="checkbox" component="input" name="remember" /> Remember Me
				</label>
			</Col>
		</FormGroup>
		{ error && <Alert bsStyle="danger">{ error }</Alert> }
		<FormGroup>
			<Col md={6} mdOffset={4}>
				<Button type="submit" bsStyle="primary">Login</Button>&nbsp; 

				<Link to="/password-reset">Forgot Your Password?</Link>
			</Col>
		</FormGroup>
		{/* <a href="/auth/github">Connect with GitHub</a> */}
	</Form>
);

export const Intro = () => (
	<div>
		<p><strong>What's in my Freezer?</strong> is a simple inventory application. It was inspired by going to the grocery store and buying things that were already in my freezer.</p>
		<p>It had to be simple, or I wouldn't use it. Hence, it is mostly just adding, editing, and removing items.</p>
		<p>I do have some things planned, such as multiple containers, tags, advanced search, etc.</p>
		<p>There is no "sharing" option. What's in your freezer is between you and the database</p>
		<p><strong>To get started</strong>, 
			check out the <a href="/demo" target='_blank'>demo</a> (data stored&nbsp; 
			<a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" rel="noopener" target="_blank">locally</a>) 
			or <Link to="/register">register</Link>					
		</p>
	</div>
);

const Login = (props) =>  {	
	const { error, handleSubmit, invalid, pristine, reset, submitting } = props;
	console.log(props);
	return (
		<Grid fluid>
			<Row>
				<Col md={6}>
					<Panel header="Login" bsStyle="default">
						<LoginForm {...props} />
					</Panel>
				</Col>
				<Col md={6}>
					<Panel header="New Here?" bsStyle="success">
						<Intro /	>				
					</Panel>
				</Col>			
			</Row>
		</Grid>
	);
}

export default reduxForm({
  form: 'login', // a unique identifier for this form
  validate
})(Login);