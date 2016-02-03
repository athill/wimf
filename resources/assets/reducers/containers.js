import { RECEIVE_CONTAINERS } from '../constants/ActionTypes'

const initialState = {
        items: [],
        selected: null
};

export default function containers(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CONTAINERS:
      return action.payload;
    default:
      return state
  }
}
