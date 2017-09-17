import React from 'react';
import { Col, Grid, Panel, Row } from 'react-bootstrap';

const PasswordReset = () => (
	<Grid fluid>
		<Row>
			<Col md={8} mdOffset={2}>
				<Panel header="Reset Password" bsStyle="default">
					<form className="form-horizontal" role="form" method="POST" action="">

						<div className="form-group">
							<label className="col-md-4 control-label">E-Mail Address</label>
							<div className="col-md-6">
								<input type="email" className="form-control" name="email" value="" />
							</div>
						</div>

						<div className="form-group">
							<div className="col-md-6 col-md-offset-4">
								<button type="submit" className="btn btn-primary">
									Send Password Reset Link
								</button>
							</div>
						</div>
					</form>
				</Panel>
			</Col>
		</Row>
	</Grid>
);

export default PasswordReset;