import { RECEIVE_ITEMS, ADD_ITEM_SUCCESS, DELETE_ITEM_SUCCESS, 
  EDIT_ITEM_SUCCESS, SET_ITEMS_FILTER } from '../constants/ActionTypes';
import { sortCategories, addItemToCategories, removeItemFromCategories,
  updateItemInCategories } from '../util/ContainerOperations';

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
    case DELETE_ITEM_SUCCESS:
      console.debug('items reducer DELETE_ITEM_SUCCESS', state, action);
      return {
        ...state,
        categories: removeItemFromCategories(state.categories, action.payload)
      };
    case EDIT_ITEM_SUCCESS:
      console.debug('items reducer EDIT_ITEM_SUCCESS', state, action);
      return {
        ...state,
        categories: updateItemInCategories(state.categories, action.payload)
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
