import { defaultFormModalHandler, ModalTypes } from '../util/formModal';


export const initialState = {
    show: ModalTypes.NONE,
    errors: [],
    selected: undefined
};

export default function itemForm(state = initialState, action) {
  return defaultFormModalHandler('ITEM', state, action);
}
