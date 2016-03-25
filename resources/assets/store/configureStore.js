import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';


import rootReducer from '../reducers';

const middleware = [
  thunkMiddleware,
  promiseMiddleware,
];

if (process.env.NODE_ENV === 'development') {
  middleware.push(loggerMiddleware());
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}