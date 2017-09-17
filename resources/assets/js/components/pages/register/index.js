import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, Panel, Row } from 'react-bootstrap';

const InputField = ({ name, label, id=null, type='text' }) => (
	<FormGroup controlId={id || name}>
		<Col componentClass={ControlLabel} md={4}>
			{label}:
		</Col>
		<Col md={4}>
			<FormControl type={type} name={name} value="" />
		</Col>
	</FormGroup>
);

const Register = () => (
	<Grid fluid>
		<Row>
			<Col md={8} mdOffset={2}>	
				<Panel header="Register" bsStyle="default">

					<Form horizontal>
						<InputField label="Name" name="name" />
						<InputField label="Email" name="email" />
						<InputField label="Password" name="password" type="password" />
						<InputField label="Confirm Password" name="password_confirmation" type="password" />
						<FormGroup>
							<Col md={4} mdOffset={4}>
								<Button type="submit">Register</Button>
							</Col>
						</FormGroup>												
					</Form>
				</Panel>
			</Col>
		</Row>
	</Grid>				
);

export default Register;
