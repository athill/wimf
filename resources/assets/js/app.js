window.$ = window.jQuery = require('jquery')
require('./bootstrap');

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import createStore from './store';

createStore();

import App from './components/App';

render(<App />, document.getElementById('app'));