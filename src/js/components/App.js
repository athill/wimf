import React, { Component } from 'react';
import { Provider } from 'react-redux';

import createStore from '../store';
import Page from './Page';
import reducers from '../modules/reducer';
import { fetchUserInfo } from '../modules/user';

const store = createStore(reducers(), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

if (!sessionStorage.getItem('token') && localStorage.getItem('token')) {
    sessionStorage.setItem('token', localStorage.getItem('token'));
    store.dispatch(fetchUserInfo());
}

class App extends Component {
  render() {
    return (
    <Provider store={store}>
        <Page />
    </Provider>
    )
  }
};

export default App;
