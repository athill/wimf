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
import { appNamespace, getConstants, keepOpenHandler, updateEntity } from './utils';


//// action constants

export const REQUEST_CONTAINERS  = getConstants('REQUEST_CONTAINERS');
export const ADD_CONTAINER = getConstants('ADD_CONTAINER');
export const DELETE_CONTAINER = getConstants('DELETE_CONTAINER');
export const EDIT_CONTAINER = getConstants('EDIT_CONTAINER');
export const SELECT_CONTAINER = appNamespace.defineAction('SELECT_CONTAINER');
//// items
export const REQUEST_ITEMS  = getConstants('REQUEST_ITEMS');
export const ADD_ITEM = getConstants('ADD_ITEM');
export const DELETE_ITEM = getConstants('DELETE_ITEM');
export const EDIT_ITEM = getConstants('EDIT_ITEM');
export const SET_ITEMS_FILTER = appNamespace.defineAction('SET_ITEMS_FILTER');

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
    case ADD_ITEM.SUCCESS:
      categories = addItemToCategories(categories, action.payload.data);
      break;
    case EDIT_ITEM.SUCCESS:
      categories = updateItemInCategories(categories, action.payload.data);
      break;
    case DELETE_ITEM.SUCCESS:
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
      case ADD_CONTAINER.SUCCESS:
        return {
          ...state,
          containers: addContainerToContainers(state.containers, action.payload.data),
          selectedId: action.payload.data.id
        };
      case EDIT_CONTAINER.SUCCESS:
        return {
          ...state,
          containers: updateContainerInContainers(state.containers, action.payload.data)
        };        
      case DELETE_CONTAINER.SUCCESS:
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
    case REQUEST_CONTAINERS.SUCCESS:
      return action.payload;

    case ADD_CONTAINER.SUCCESS:
    case EDIT_CONTAINER.SUCCESS:
    case DELETE_CONTAINER.SUCCESS:
      const newState = updateContainerReducer(state, action);
      return newState;

    case REQUEST_ITEMS:
      return {
        ...state,
        loading: true
      };
    case REQUEST_ITEMS.SUCCESS:
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
    case ADD_ITEM.SUCCESS:
    case DELETE_ITEM.SUCCESS:
    case EDIT_ITEM.SUCCESS:
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
const receiveContainers = createAction(REQUEST_CONTAINERS.SUCCESS, data => processContainers(data));
const selectContainer = createAction(SELECT_CONTAINER);

//// items
const requestItems = createAction(REQUEST_ITEMS);
const receiveItems = createAction(REQUEST_ITEMS.SUCCESS);
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
  successAction: createAction(ADD_CONTAINER.SUCCESS), 
  url: '/api/containers/'
});

export const editContainer = updateContainer({
  handler: put,
  requestAction: createAction(EDIT_CONTAINER), 
  successAction: createAction(EDIT_CONTAINER.SUCCESS), 
  url: '/api/containers/{id}'
});

export const removeContainer = updateContainer({
  handler: deleteRequest,
  requestAction: createAction(DELETE_CONTAINER), 
  successAction: createAction(DELETE_CONTAINER.SUCCESS), 
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
  successAction: createAction(ADD_ITEM.SUCCESS),
  url: '/api/items/',
  valuesTransformer: itemValuesTransformer
});

export const editItem = updateItem({
  handler: put,
  requestAction: createAction(EDIT_ITEM), 
  successAction: createAction(EDIT_ITEM.SUCCESS),
  url: '/api/items/{id}',
  valuesTransformer: itemValuesTransformer
});

export const removeItem = updateItem({
  handler: deleteRequest,
  requestAction: createAction(DELETE_ITEM), 
  successAction: createAction(DELETE_ITEM.SUCCESS),
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
