import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import itemForm from './itemForm';
import containers from './containers';
import user from './user';
import containerForm from './containerForm'

export default combineReducers({
  containers,
  user,
  itemForm,
  containerForm,
  form: formReducer
});
