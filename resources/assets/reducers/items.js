import { RECEIVE_ITEMS } from '../constants/ActionTypes'

export const initialState = {
    items: { 
        categories: [] 
    }
};

export default function items(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ITEMS:
    	return action.payload;
    default:
      return state;
  }
}
