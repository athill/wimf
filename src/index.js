import React from 'react';
import { render } from 'react-dom';

import App from './js/components/App';

import './index.scss';

window.$ = window.jQuery = require('jquery')
require('./js/bootstrap');

render(<App />, document.getElementById('app'));