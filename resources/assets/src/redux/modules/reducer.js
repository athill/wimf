import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import itemForm from '../../reducers/itemForm';
import items from '../../reducers/items';
import containers from '../../reducers/containers';
import user from '../../reducers/user';
import containerForm from './containerForm'

export default combineReducers({
  containers,
  items,
  user,
  itemForm,
  containerForm,
  form: formReducer
});
