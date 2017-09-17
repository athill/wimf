import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import ReactDOM, { render } from 'react-dom';

// import { Router, Route, browserHistory } from 'react-router';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import AppNavbar from './AppNavbar';
import Login from './pages/login';
import Home from './pages/home';
import PasswordReset from './pages/password-reset';
import Register from './pages/register';
import Import from './pages/import';

class App extends Component {
  render() {
    return (
    <BrowserRouter>  
        <div>  
            <AppNavbar />
            <Grid>
                <Row>
                    <Col md={12}>
                        <Route path="/" exact component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/demo" exact component={Home}/>
                        <Route path="/password-reset" exact component={PasswordReset}/>
                        <Route path="/register" exact component={Register}/>
                        <Route path="/import" exact component={Import}/>
                    </Col>
                </Row>
            </Grid>
        </div>
    </BrowserRouter>
    )
  }
};



const app = document.getElementById('app');
if (app) {
    render(<App />, document.getElementById('app'));
}

export default App;