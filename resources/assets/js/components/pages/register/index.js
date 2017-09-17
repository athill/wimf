import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, Panel, Row } from 'react-bootstrap';

const Register = () => (
	<Grid fluid>
		<Row>
			<Col md={8} mdOffset={2}>	
				<Panel header="Register" bsStyle="default">

					<Form horizontal>
						<FormGroup controlId="name">
							<Col componentClass={ControlLabel} md={4}>
								Name:
							</Col>
							<Col md={4}>
								<FormControl type="text" name="name" value="" />
							</Col>
						</FormGroup>

						<FormGroup controlId="email">
							<Col componentClass={ControlLabel} md={4}>
								Email Address:
							</Col>
							<Col md={4}>
								<FormControl type="text" name="email" value="" />
							</Col>
						</FormGroup>

						<FormGroup controlId="password">
							<Col componentClass={ControlLabel} md={4}>
								Password:
							</Col>
							<Col md={4}>
								<FormControl type="password" name="password" value="" />
							</Col>
						</FormGroup>

						<FormGroup controlId="password_confirmation">
							<Col componentClass={ControlLabel} md={4}>
								Confirm Password:
							</Col>
							<Col md={4}>
								<FormControl type="password" name="password_confirmation" value="" />
							</Col>
						</FormGroup>

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
