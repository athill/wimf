import { defaultFormModalHandler, ModalTypes } from '../constants/ActionTypes'


export const initialState = {
    show: ModalTypes.NONE,
    errors: [],
    selected: undefined
};

export default function containerForm(state = initialState, action) {
  return defaultFormModalHandler('CONTAINER', state, action);
}
