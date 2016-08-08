import { RECEIVE_CONTAINERS } from '../constants/ActionTypes'
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
    case DELETE_CONTAINER_SUCCESS:
      return {
        ...state,
        items: removeContainerFromContainers(state.items, action.payload)
      };
    case EDIT_CONTAINER_SUCCESS:
      return {
        ...state,
        items: updateContainerInContainers(state.items, action.payload)
      };       
    default:
      return state
  }
}
