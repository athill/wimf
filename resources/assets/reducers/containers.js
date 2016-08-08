import { RECEIVE_CONTAINERS, ADD_CONTAINER_SUCCESS, EDIT_CONTAINER_SUCCESS, DELETE_CONTAINER_SUCCESS } from '../constants/ActionTypes'
import { addContainerToContainers, updateContainerInContainers, removeContainerFromContainers } from '../util/ContainerOperations';

export const initialState = {
  items: [],
  selected: null
};

export default function containers(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CONTAINERS:
      return action.payload;

    case ADD_CONTAINER_SUCCESS:
    	return {
        ...state,
        items: addContainerToContainers(state.items, action.payload.data)
      };
    case EDIT_CONTAINER_SUCCESS:
      return {
        ...state,
        items: updateContainerInContainers(state.items, action.payload)
      };        
    case DELETE_CONTAINER_SUCCESS:
      return {
        ...state,
        items: removeContainerFromContainers(state.items, action.payload)
      };     
    default:
      return state
  }
}
