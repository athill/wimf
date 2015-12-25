import { RECEIVE_CONTAINERS } from '../constants/ActionTypes'

const initialState = [];

export default function containers(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CONTAINERS:
      let newstate = action.containers;
      return newstate;

    // case DELETE_TODO:
    //   return state.filter(todo =>
    //     todo.id !== action.id
    //   )

    // case EDIT_TODO:
    //   return state.map(todo =>
    //     todo.id === action.id ?
    //       Object.assign({}, todo, { text: action.text }) :
    //       todo
    //   )

    // case COMPLETE_TODO:
    //   return state.map(todo =>
    //     todo.id === action.id ?
    //       Object.assign({}, todo, { completed: !todo.completed }) :
    //       todo
    //   )

    // case COMPLETE_ALL:
    //   const areAllMarked = state.every(todo => todo.completed)
    //   return state.map(todo => Object.assign({}, todo, {
    //     completed: !areAllMarked
    //   }))

    // case CLEAR_COMPLETED:
    //   return state.filter(todo => todo.completed === false)

    default:
      return state
  }
}
