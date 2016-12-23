import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';

//// store creation function 
import configureStore from './redux/create';

//// components
import App from './components/App';
////// pages
import Wimf from './components/Wimf/Wimf';
import Containers from './components/Wimf/modules/Containers';

//// store
const store = configureStore();

//// application structure
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

//// start the party
ReactDOM.render(
	React.createElement(Application), document.getElementById('root')
);
