import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import ReactDOM, { render } from 'react-dom';

// import { Router, Route, browserHistory } from 'react-router';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Login from './pages/login';
import Home from './pages/home';

class App extends Component {
  render() {
    return (
    <BrowserRouter>  
        <div>  
              <div className="container">
                <nav className="navbar navbar-default">
                  <div className="container-fluid">
                    <div className="navbar-header">
                      <a className="navbar-brand" href="#">AppDividend</a>
                    </div>
                    <ul className="nav navbar-nav">
                      <li className="active"><a href="#">Home</a></li>
                      <li><Link to="/login">Login</Link></li>
                      <li><a href="#">Page 2</a></li>
                      <li><a href="#">Page 3</a></li>
                    </ul>
                  </div>
                </nav>
            </div>  
            <Grid>
                <Row>
                    <Col md={12}>
                        <Route path="/" exact component={Home}/>
                        <Route path="/login" component={Login}/>        
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