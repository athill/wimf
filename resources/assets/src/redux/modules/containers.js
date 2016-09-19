import { addContainerToContainers, updateContainerInContainers, removeContainerFromContainers } from '../../util/ContainerOperations';

//// actions
export const FETCH_CONTAINERS = 'FETCH_CONTAINERS';
export const REQUEST_CONTAINERS  = 'REQUEST_CONTAINERS';
export const RECEIVE_CONTAINERS = 'RECEIVE_CONTAINERS';
export const ADD_CONTAINER = 'ADD_CONTAINER';
export const ADD_CONTAINER_SUCCESS = 'ADD_CONTAINER_SUCCESS';
export const ADD_CONTAINER_ERROR  = 'ADD_CONTAINER_ERROR';
export const DELETE_CONTAINER = 'DELETE_CONTAINER';
export const DELETE_CONTAINER_SUCCESS = 'DELETE_CONTAINER_SUCCESS';
export const DELETE_CONTAINER_ERROR = 'DELETE_CONTAINER_ERROR';
export const EDIT_CONTAINER = 'EDIT_CONTAINER';
export const EDIT_CONTAINER_SUCCESS = 'EDIT_CONTAINER_SUCCESS';
export const EDIT_CONTAINER_ERROR = 'EDIT_CONTAINER_ERROR';
export const SELECT_CONTAINER = 'SELECT_CONTAINER';

//// reducer
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