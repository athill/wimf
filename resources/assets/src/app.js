import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

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
		<App>
			<Items />
		</App>
	</Provider>
);

//// start the party
ReactDOM.render(
	React.createElement(Application), document.getElementById('root')
);
