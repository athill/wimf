import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import itemForm from './itemForm';
import items from './items';
import containers from './containers';
import user from './user';

const rootReducer = combineReducers({
  containers,
  items,
  user,
  itemForm,
  form: formReducer
})

export default rootReducer
