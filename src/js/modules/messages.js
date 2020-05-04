import { createAction } from 'redux-actions';

////consts
//////states
// export const POSTED = 'POSTED';
// export const REMOVED = 'REMOVED';

export const MESSAGE_POST = 'MESSAGE_POST'; 



// export const getConstants = (constant, states = []) => appNamespace.defineAction(constant, [ ...states, SUCCESS, ERROR ]);

//// actions
export const postMessage = createAction(MESSAGE_POST);


//// reducer
export const initialState = {
	message: null,				///// this should time out, but show up on any page
	pageMessage: null,			///// this should be removed if the page changes, optional timeout?
	messages: []				//// this will be a queue of messages with timeouts
};



export default function reducer(state = initialState, action={}) {
  switch (action.type) {
    case MESSAGE_POST:
      let message = action.payload;
      if (!action.type) {
      	message = {
      		type: 'success',
      		text: action.payload,
      	}
      }
      return {
        ...state,
        message
      };
    default:
      return state;
  }
};


export const postMessageSuccess = message => {
	return dispatch => {
    dispatch(postMessage({
      text: message,
      type: 'success'
    }));
  }
    ///// decent technique, but maybe not for this page
    //   setTimeout(() => {
    //     dispatch(createAction(PASSWORD_RESET.MESSAGE)())
    //   }, 5000)  
}
