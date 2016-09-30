import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IndexRoute ,Router, Route, hashHistory } from 'react-router';


import App from './components/App';
import configureStore from './redux/create';

//// modules
import Wimf from './components/Wimf/Wimf';
import Containers from './components/Wimf/modules/Containers';

const store = configureStore();

const Application = () => (
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Wimf} />
				<Route path="/containers" component={Containers}/>			
			</Route>
		</Router>
	</Provider>
);


ReactDOM.render(
	React.createElement(Application), document.getElementById('app')
);


/*
  
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Wimf} />
			<Route path="/containers" component={Containers}/>
		</Route>
	</Router>
  </Provider>
*/