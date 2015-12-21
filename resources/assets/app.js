import 'babel-core/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import configureStore from './store/configureStore'
// import 'todomvc-app-css/index.css'

const store = configureStore()


// console.log(render);



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)


// //import './favicon.ico';
// //import './index.html';
// import 'babel-core/polyfill';
// //import 'normalize.css/normalize.css';
// //import './scss/app.scss';

// import App from 'components/App';


// import ReactDOM from 'react-dom';

// ReactDOM.render(
//   <App/>,
//   document.getElementById('app')
// );
