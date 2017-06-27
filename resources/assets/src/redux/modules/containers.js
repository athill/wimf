import { createAction } from 'redux-actions';
import { change, reset, SubmissionError } from 'redux-form';
import format from 'string-template';

import { hideItemForm, setItemFormError } from './itemForm';
import { hideContainerForm, setContainerFormError } from './containerForm';

//// utils
import { getIsoFormat } from '../../util/DateUtils';

import { get, deleteRequest, post, put } from '../../util/RemoteOperations';
import { 
  addContainerToContainers, 
  addItemToCategories, 
  getSortedContainerArray, 
  removeContainerFromContainers, 
  removeItemFromCategories, 
  sortCategories,
  updateCategoriesInContainers, 
  updateContainerInContainers,
  updateItemInCategories 
} from '../../util/ContainerOperations';

//// actions
export const FETCH_CONTAINERS = 'FETCH_CONTAINERS';
export const REQUEST_CONTAINERS  = 'REQUEST_CONTAINERS';
export const RECEIVE_CONTAINERS = 'RECEIVE_CONTAINERS';
export const ADD_CONTAINER = 'ADD_CONTAINER';
export const ADD_CONTAINER_SUCCESS = 'ADD_CONTAINER_SUCCESS';
export const DELETE_CONTAINER = 'DELETE_CONTAINER';
export const DELETE_CONTAINER_SUCCESS = 'DELETE_CONTAINER_SUCCESS';
export const EDIT_CONTAINER = 'EDIT_CONTAINER';
export const EDIT_CONTAINER_SUCCESS = 'EDIT_CONTAINER_SUCCESS';
export const SELECT_CONTAINER = 'SELECT_CONTAINER';
//// items
export const FETCH_ITEMS = 'FETCH_ITEMS';
export const REQUEST_ITEMS  = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const ADD_ITEM = 'ADD_ITEM';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const DELETE_ITEM_ERROR = 'DELETE_ITEM_ERROR';
export const EDIT_ITEM = 'EDIT_ITEM';
export const EDIT_ITEM_SUCCESS = 'EDIT_ITEM_SUCCESS';
export const SET_ITEMS_FILTER = 'SET_ITEMS_FILTER';

export const ITEM_FORM_NAME = 'item';
export const CONTAINER_FORM_NAME = 'container';

//// reducer
export const initialState = {
  containers: [],
  selectedId: null,
  loading: false,
  filter: ''
};


const updateItemReducer = (state, action) => {
  let categories = state.containers[state.selectedId].categories;
  switch (action.type) {
    case ADD_ITEM_SUCCESS:
      categories = addItemToCategories(categories, action.payload.data);
      break;
    case EDIT_ITEM_SUCCESS:
      categories = updateItemInCategories(categories, action.payload.data);
      break;
    case DELETE_ITEM_SUCCESS:
      categories = removeItemFromCategories(categories, action.payload.data);
      break;
    default:
      console.error('Invalid action', action.type);           
  }
  const containers = updateCategoriesInContainers(state.containers, state.selectedId, categories);
  return {
    ...state,
    containers
  }
};

const updateContainerReducer = (state, action) => {
    switch (action.type) {
      case ADD_CONTAINER_SUCCESS:
        return {
          ...state,
          containers: addContainerToContainers(state.containers, action.payload.data),
          selectedId: action.payload.data.id
        };
      case EDIT_CONTAINER_SUCCESS:
        return {
          ...state,
          containers: updateContainerInContainers(state.containers, action.payload.data)
        };        
      case DELETE_CONTAINER_SUCCESS:
        //// determine new selected container id
        const containerArray = getSortedContainerArray(state.containers);
        //// find index of passed in container to remove
        const removeIndex = containerArray.findIndex(x => x.id === action.payload.data.id);
        const selectIndex = removeIndex == 0 ? 1 : removeIndex - 1;
        let selectedId = containerArray[selectIndex].id;
        return {
          ...state,
          selectedId,
          containers: removeContainerFromContainers(state.containers, action.payload.data)
        };      
    }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CONTAINERS:
      return action.payload;

    case ADD_CONTAINER_SUCCESS:
    case EDIT_CONTAINER_SUCCESS:
    case DELETE_CONTAINER_SUCCESS:
      const newState = updateContainerReducer(state, action);
      return newState;

    case REQUEST_ITEMS:
      return {
        ...state,
        loading: true
      };
    case RECEIVE_ITEMS:
      let containers = Object.assign({}, state.containers);
      const container = action.payload;
      if (!('categories' in container)) {
        throw new Error('categories should exist in container (see fetchItems): ' + container.id);
      }
      const categories = container.categories;
      return {
        ...state,
        loading: false,
        containers: {
          ...containers,
          [container.id]: {
            ...container,
            categories
          }
        }
      };      
    case SELECT_CONTAINER:
      return {
        ...state,
        selectedId:  action.payload || state.selectedId
      }; 
    case ADD_ITEM_SUCCESS:
    case DELETE_ITEM_SUCCESS:
    case EDIT_ITEM_SUCCESS:
      const items = updateItemReducer(state, action); 
      return  items;
    case SET_ITEMS_FILTER:
      return {
        ...state,
        filter: action.payload
      };                 
    default:
      return state
  }
}


//// action creators
const processContainers = json => {
  const containers = {};
  json.forEach(container => containers[container.id] = container );
  return {
      containers,
      selectedId: json[0].id+''
  };
};
const requestContainers = createAction(REQUEST_CONTAINERS);
const receiveContainers = createAction(RECEIVE_CONTAINERS, data => processContainers(data));
const selectContainer = createAction(SELECT_CONTAINER);

//// items
const requestItems = createAction(REQUEST_ITEMS);
const receiveItems = createAction(RECEIVE_ITEMS);
export const setItemsFilter = createAction(SET_ITEMS_FILTER);

//// containers
export const fetchContainers = () => {
  return dispatch => {
    dispatch(requestContainers());
    return get(
      '/api/containers',
      response => {
        dispatch(receiveContainers(response.data));
        dispatch(fetchItems(response.data[0].id));
      }
    );
  };
};


/**
 * determines whether to keep form after successful submission open or not, autofocuses selected field by name
 * @param  {string} autofocusField name of field to autofocus if keeping form open
 * @param  {string} formName       name of redux-form object
 * @return {function(dispatch, hideAction, respone, values)} handler method for hideFormHandler
 */
const keepOpenHandler = autofocusField => {
  /**
   * handler method for hideFormHandler
   * expects a boolean values.keepOpen to determine whether to keep the modal open after successful submission
   * @param  {function} dispatch   redux dispatch function
   * @param  {function} hideAction redux action to hide form modal
   * @param  {object} values     values passed to form
   * @return {none}            [description]
   */
  return (dispatch, formName, hideAction,  values) => {
    if (values.keepOpen) {
      dispatch(change(formName, 'keepOpen', true));
      const autofocus = document.getElementById(autofocusField);
      autofocus.focus();
    } else {
      dispatch(hideAction());
    } 
  }
};



export const updateEntity = ({ formName, handler, hideAction, requestAction, successAction, url,
    hideFormHandler = (dispatch, formName, hideAction, values) => dispatch(hideAction()),
    valuesTransformer = (values, getState) => values
   }) => {
  return (values, resolve, reject) => {
    url = format(url, values);
    return (dispatch, getState) => {
      dispatch(requestAction());
      return handler(
        url,
        valuesTransformer(values, getState),
        response => {
          dispatch(reset(formName));
          dispatch(successAction(response.data ? response : { data: values }));
          hideFormHandler(dispatch, formName, hideAction, values);     
          resolve();
        },
        error => {
          reject(error);
        }
      );
    };
  };  
};

//// Container form actions
export const updateContainer = ({ handler, hideFormHandler, requestAction, successAction, url, valuesTransformer }) => updateEntity({
  formName: CONTAINER_FORM_NAME, 
  handler,
  hideAction: hideContainerForm,  
  hideFormHandler,
  requestAction,
  successAction,
  url,
  valuesTransformer
});

export const addContainer = updateContainer({
  handler: post,
  hideFormHandler: keepOpenHandler('name'),
  requestAction: createAction(ADD_CONTAINER), 
  successAction: createAction(ADD_CONTAINER_SUCCESS), 
  url: '/api/containers/'
});

export const editContainer = updateContainer({
  handler: put,
  requestAction: createAction(EDIT_CONTAINER), 
  successAction: createAction(EDIT_CONTAINER_SUCCESS), 
  url: '/api/containers/{id}'
});

export const removeContainer = updateContainer({
  handler: deleteRequest,
  requestAction: createAction(DELETE_CONTAINER), 
  successAction: createAction(DELETE_CONTAINER_SUCCESS), 
  url: '/api/containers/{id}'
});

//// Item form actions
export const updateItem = ({ handler, hideFormHandler, requestAction, successAction, url, valuesTransformer }) => {
  return updateEntity({
    formName: ITEM_FORM_NAME, 
    handler,
    hideAction: hideItemForm,
    hideFormHandler,
    requestAction,
    successAction,
    url,
    valuesTransformer
  });
};

const itemValuesTransformer = (values, getState) => ({
  ...values,
  container_id: getState().containers.selectedId,
  date: getIsoFormat(values.date)
});

export const addItem = updateItem({
  handler: post,
  hideFormHandler: keepOpenHandler('category'),
  requestAction: createAction(ADD_ITEM), 
  successAction: createAction(ADD_ITEM_SUCCESS),
  url: '/api/items/',
  valuesTransformer: itemValuesTransformer
});

export const editItem = updateItem({
  handler: put,
  requestAction: createAction(EDIT_ITEM), 
  successAction: createAction(EDIT_ITEM_SUCCESS),
  url: '/api/items/{id}',
  valuesTransformer: itemValuesTransformer
});

export const removeItem = updateItem({
  handler: deleteRequest,
  requestAction: createAction(DELETE_ITEM), 
  successAction: createAction(DELETE_ITEM_SUCCESS),
  url: '/api/items/{id}'
});

//// select container action
export const select = id => {
  return (dispatch, getState) => {
    dispatch(selectContainer(id));
    dispatch(fetchItems(id));
  };
};

//// fetch items
export const fetchItems = containerId => (
  (dispatch, getState) => {
    const { containers} = getState();
    if ('categories' in containers.containers[containerId]) {
      dispatch(receiveItems(containers.containers[containerId]));
    } else {
      dispatch(requestItems());
      get(
        `/api/containers/${containerId}`,
        response => {
          dispatch(receiveItems(response.data));
        }
      );
    }
  }
);
