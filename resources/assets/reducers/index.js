import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import items from './items';
import containers from './containers';

const rootReducer = combineReducers({
  containers,
  items,
  form: formReducer
})

export default rootReducer
