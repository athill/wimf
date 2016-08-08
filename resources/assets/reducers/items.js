import { REQUEST_ITEMS, RECEIVE_ITEMS, ADD_ITEM_SUCCESS, DELETE_ITEM_SUCCESS, 
  EDIT_ITEM_SUCCESS, SET_ITEMS_FILTER } from '../constants/ActionTypes';
import { sortCategories, addItemToCategories, removeItemFromCategories,
  updateItemInCategories } from '../util/ContainerOperations';

export const initialState = {
    categories: [],
    name: '',
    id: 0,
    description: '',
    filter: '',
    loading: true
};

export default function items(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ITEMS:
      return {
        ...state,
        loading: true
      };
    case RECEIVE_ITEMS:
      return {
        ...state,
        loading: false,
        name: action.payload.name,
        id: action.payload.id,
        description: action.payload.description,
        categories: sortCategories(action.payload.categories)
      };
    case ADD_ITEM_SUCCESS:
    	return {
        ...state,
        categories: addItemToCategories(state.categories, action.payload.data)
      };
    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        categories: removeItemFromCategories(state.categories, action.payload)
      };
    case EDIT_ITEM_SUCCESS:
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
