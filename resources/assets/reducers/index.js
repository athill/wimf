import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import itemForm from './itemForm';
import items from './items';
import containers from './containers';
import user from './user';
import containerForm from './containerForm'

const rootReducer = combineReducers({
  containers,
  items,
  user,
  itemForm,
  containerForm,
  form: formReducer
});

export default rootReducer
