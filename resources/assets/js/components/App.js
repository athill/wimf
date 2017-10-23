import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';


import AppNavbar from './AppNavbar';
import history from '../history';
import Login from './pages/login';
import Home from './pages/home';
import PasswordReset from './pages/password-reset';
import PrivateRoute from './PrivateRoute';
import Register from './pages/register';
import Import from './pages/import';
import createStore from '../store';
import reducers from '../modules/reducer';

const store = createStore(reducers(), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class App extends Component {
  render() {
    return (
    <Provider store={store}>
        <Router history={history}>  
            <div>  
                <AppNavbar />
                <Grid>
                    <Row>
                        <Col md={12}>
                            <PrivateRoute path="/" exact component={Home}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/demo" exact component={Home}/>
                            <Route path="/password-reset" exact component={PasswordReset}/>
                            <Route path="/register" exact component={Register}/>
                            <Route path="/import" exact component={Import}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        </Router>
    </Provider>
    )
  }
};

export default App;
