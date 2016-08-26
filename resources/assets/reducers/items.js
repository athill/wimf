import { REQUEST_ITEMS, RECEIVE_ITEMS, ADD_ITEM_SUCCESS, DELETE_ITEM_SUCCESS, 
  EDIT_ITEM_SUCCESS, SET_ITEMS_FILTER } from '../constants/ActionTypes';
import { sortCategories, addItemToCategories, removeItemFromCategories,
  updateItemInCategories, updateCategoriesInContainers } from '../util/ContainerOperations';

export const initialState = {
    containers: {},
    categories: [],
    name: '',
    id: 0,
    description: '',
    filter: '',
    loading: true
};

const updateItems = (state, action) => {
  let categories;
  switch (action.type) {
    case ADD_ITEM_SUCCESS:
      categories = addItemToCategories(state.categories, action.payload.data);
      break;
    case EDIT_ITEM_SUCCESS:
      categories = updateCategoriesInContainers(state.categories, action.payload.data);
      break;
    case DELETE_ITEM_SUCCESS:
      categories = removeItemFromCategories(state.categories, action.payload.data);
      break;
    default:
      console.error('How did I get here?');           
  }
  return {
    ...state,
    categories,
    containers: updateCategoriesInContainers(state.containers, action.payload.container_id, categories)
  }
}


export default function items(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ITEMS:
      return {
        ...state,
        loading: true
      };
    case RECEIVE_ITEMS:
      let containers = state.containers;
      if (!containers[action.payload.id]) { 
        containers = {
          ...containers,
          [action.payload.id]: action.payload
        };
      }
      return {
        ...state,
        containers,
        loading: false,
        name: action.payload.name,
        id: action.payload.id,
        description: action.payload.description,
        categories: sortCategories(action.payload.categories)
      };
    case ADD_ITEM_SUCCESS:
    case DELETE_ITEM_SUCCESS:
    case EDIT_ITEM_SUCCESS:
      const items = updateItems(state, action); 
    	return  items;
    case SET_ITEMS_FILTER:
      return {
        ...state,
        filter: action.payload
      };      
    default:
      return state;
  }
}
