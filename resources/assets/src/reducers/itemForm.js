import { defaultFormModalHandler, ModalTypes } from '../constants/ActionTypes'


export const initialState = {
    show: ModalTypes.NONE,
    errors: [],
    selected: undefined
};

export default function itemForm(state = initialState, action) {
  return defaultFormModalHandler('ITEM', state, action);
}
