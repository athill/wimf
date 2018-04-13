import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import AppNavbar from './AppNavbar';
import history from '../history';
import Login from './pages/login';
import Items from './pages/items';
import PasswordReset from './pages/password-reset';
import PasswordReset2 from './pages/reset-password-2';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Register from './pages/register';
import Import from './pages/import';

const Page = () => (
    <Router history={history}>  
        <div>  
            <AppNavbar />
            <Grid>
                <Row>
                    <Col md={12}>
                        <PrivateRoute path="/" exact component={Items}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/demo" exact component={Items}/>
                        <Route path="/password-reset" exact component={PasswordReset}/>
                        <Route path="/password/reset" exact component={PasswordReset2}/>
                        <PublicRoute path="/register" exact component={Register}/>
                        <Route path="/import" exact component={Import}/>
                    </Col>
                </Row>
            </Grid>
        </div>
    </Router>
);

const mapStateToProps = ({}) => {
	return {

	};
};

export default connect(mapStateToProps)(Page);