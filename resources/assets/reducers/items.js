import { RECEIVE_ITEMS, ADD_ITEM_SUCCESS, SET_ITEMS_FILTER } from '../constants/ActionTypes';
import { sortCategories, addItemToCategories } from '../util/ContainerOperations';

export const initialState = {
    categories: [],
    name: '',
    id: 0,
    description: '',
    filter: ''
};

export default function items(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ITEMS:
      return {
        ...state,
        name: action.payload.name,
        id: action.payload.id,
        description: action.payload.description,
        categories: sortCategories(action.payload.categories)
      };
    case ADD_ITEM_SUCCESS:
      console.debug('items reducer ADD_ITEM_SUCCESS', state, action);
    	return {
        ...state,
        categories: addItemToCategories(state.categories, action.payload.data)
      };
    case SET_ITEMS_FILTER:
      return {
        ...state,
        filter: action.payload
      };      
    default:
      return state;
  }
}
