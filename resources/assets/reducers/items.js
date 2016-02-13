import { RECEIVE_ITEMS } from '../constants/ActionTypes'

const initialState = {
    items: { 
        categories: [] 
    }
};

export default function containers(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ITEMS:
    	console.log('RECEIVE_ITEMS', action);
    	return action.payload;
    default:
      return state;
  }
}
