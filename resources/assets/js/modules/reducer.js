import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import containers from './containers';
import user from './user';

export default combineReducers({
  containers,
  user,
  form: formReducer
});
