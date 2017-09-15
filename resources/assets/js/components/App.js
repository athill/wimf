import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

import { Router, Route, browserHistory } from 'react-router';

import Login from './pages/login';

class App extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">AppDividend</a>
            </div>
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">Home</a></li>
              <li><a href="#">Page 1</a></li>
              <li><a href="#">Page 2</a></li>
              <li><a href="#">Page 3</a></li>
            </ul>
          </div>
      </nav>
          <div>
              {this.props.children}
          </div>
      </div>
    )
  }
};

const AppRouter = <Router history={browserHistory}>
  <Route path="/" component={App} >
    <Route path="/login" component={Login} />
  </Route>
</Router>;

const app = document.getElementById('app');
if (app) {
    ReactDOM.render(<App />, document.getElementById('app'));
}

export default App;