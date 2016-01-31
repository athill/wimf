import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import addForm from './addForm';
import items from './items';
import containers from './containers';
import user from './user';

const rootReducer = combineReducers({
  containers,
  items,
  user,
  addForm,
  form: formReducer
})

export default rootReducer
