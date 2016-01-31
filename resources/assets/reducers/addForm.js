import { TOGGLE_ADD_FORM, SHOW_ADD_FORM, HIDE_ADD_FORM } from '../constants/ActionTypes'

const initialState = {
    show: false
};

export default function containers(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_ADD_FORM:
      return {
      	show: !state.show
      };
    default:
      return state
  }
}
