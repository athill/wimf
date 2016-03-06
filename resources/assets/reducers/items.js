import { RECEIVE_ITEMS, ADD_ITEM_SUCCESS } from '../constants/ActionTypes';
import { sortContainer, addItemToContainer } from '../util/ContainerOperations';

export const initialState = {
    items: { 
        categories: [] 
    }
};

export default function items(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ITEMS:
    	return sortContainer(action.payload);
    case ADD_ITEM_SUCCESS:

    	return addItemToContainer(state, action.data);
    default:
      return state;
  }
}
