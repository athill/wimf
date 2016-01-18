import axios from 'axios';
import { createAction } from 'redux-actions';

import types from '../constants/ActionTypes'


export function fetchItems(container) {
  return dispatch => {
    dispatch(requestItems());
    axios.get(`/api/containers/${container.id}`)
      .then(response => {
        console.log('receiveItems then', response);
        dispatch(receiveItems(response.data));
      })
      .catch(response => {
        console.log(response);
      });  
  }
}

export const add = item => {
  return (dispatch, getState) => {
    const state = getState();
    const container = state.containers.selected;
    item.container_id = container.id;
      axios({
        method: 'post',
        url: `/api/items/`,
        data: item
      })    
      .then(response => {
        dispatch(addItem());
      })
      .then(response => {
        dispatch(fetchItems(container));
      })
      .catch(response => {
        
      });  
  }
};

const requestItems = createAction(types.REQUEST_ITEMS);

const receiveItems = createAction(types.RECEIVE_ITEMS, data => processItems(data));

const addItem = createAction(types.ADD_ITEM);


const processItems = (json) => {
  console.log('processItems', json)
  // const items = json.map(child => { 
  //   return {
  //         name: child.name, 
  //         description: child.description,
  //         id: child.id
  //     };
  //   });
  return json;
}
