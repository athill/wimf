import { RECEIVE_USER_INFO } from '../constants/ActionTypes'

export const initialState = {
  id: null,
  name: null,
  email: null
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_USER_INFO:
    
      return action.payload;
    default:
      return state
  }
}
