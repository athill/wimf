import { RECEIVE_USER_INFO } from '../constants/ActionTypes'

const initialState = {
  id: null,
  name: null,
  email: null,
  created_at: null,
  updated_at: null
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_USER_INFO:
        console.log('RECEIVE_USER_INFO reducer', state, action);
      return action.payload;
    default:
      return state
  }
}
