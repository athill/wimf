import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';


import reducer from './modules/reducer';

const logger = createLogger();

const middleware = [
  thunkMiddleware,
  promiseMiddleware
];


if (process.env.NODE_ENV === 'development' || location.host === 'wimf.app') {
  middleware.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState);

  //// not doing hot reloading atm
  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('./modules/reducer', () => {
  //     const nextRootReducer = require('./modules/reducer');
  //     store.replaceReducer(nextRootReducer);
  //   })
  // }

  return store;
};
