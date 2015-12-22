import { combineReducers } from 'redux';

import todos from './todos';
import containers from './containers';

console.log(containers);

const rootReducer = combineReducers({
  todos, containers
})

export default rootReducer
