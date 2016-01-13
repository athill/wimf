import { combineReducers } from 'redux';

import todos from './todos';
import containers from './containers';

const rootReducer = combineReducers({
  containers
})

export default rootReducer
