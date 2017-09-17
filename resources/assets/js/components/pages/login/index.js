import React from 'react';
import { Col, Grid, Panel, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Page = () => (
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
					<form className="form-horizontal" role="form" method="POST" action="#">

						<div className="form-group">
							<label className="col-md-4 control-label">E-Mail Address</label>
							<div className="col-md-6">
								<input type="email" className="form-control" name="email" value="" />
							</div>
						</div>

						<div className="form-group">
							<label className="col-md-4 control-label">Password</label>
							<div className="col-md-6">
								<input type="password" className="form-control" name="password" />
							</div>
						</div>

						<div className="form-group">
							<div className="col-md-6 col-md-offset-4">
								<div className="checkbox">
									<label>
										<input type="checkbox" name="remember" /> Remember Me
									</label>
								</div>
							</div>
						</div>

						<div className="form-group">
							<div className="col-md-6 col-md-offset-4">
								<button type="submit" className="btn btn-primary">Login</button>

								<a className="btn btn-link" href="/password/email">Forgot Your Password?</a>
							</div>
						</div>
					</form>
				</Panel>
			</Col>
		</Row>
	</Grid>
);

export default Page;