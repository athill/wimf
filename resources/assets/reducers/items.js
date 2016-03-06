import { RECEIVE_ITEMS } from '../constants/ActionTypes';
import { sortContainer } from '../util/ContainerOperations';

export const initialState = {
    items: { 
        categories: [] 
    }
};

export default function items(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ITEMS:
    	return sortContainer(action.payload);
    default:
      return state;
  }
}
