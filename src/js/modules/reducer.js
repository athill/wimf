import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import containers from './containers';
import messages from './messages';
import user from './user';

export default combineReducers({
  containers,
  messages,
  user,
  form: formReducer
});
