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
import Items from './components/pages/Items';

//// store
const store = configureStore();

//// application structure
export const Application = () => (
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Items} />
			</Route>
		</Router> 
	</Provider>
);

//// start the party
ReactDOM.render(
	React.createElement(Application), document.getElementById('root')
);
