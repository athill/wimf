import { createAction } from 'redux-actions';

import { hideItemForm, setItemFormError } from './itemForm';

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
import { appNamespace, formModalHandler, getConstants, keepOpenHandler, ModalTypes, updateEntity } from './utils';


//// action constants
export const REQUEST_CONTAINERS  = getConstants('REQUEST_CONTAINERS');
export const ADD_CONTAINER = getConstants('ADD_CONTAINER');
export const DELETE_CONTAINER = getConstants('DELETE_CONTAINER');
export const EDIT_CONTAINER = getConstants('EDIT_CONTAINER');
export const SELECT_CONTAINER = appNamespace.defineAction('SELECT_CONTAINER');

export const TOGGLE_ADD_CONTAINER_FORM = appNamespace.defineAction('TOGGLE_ADD_CONTAINER_FORM');
export const SHOW_DELETE_CONTAINER_FORM = appNamespace.defineAction('SHOW_DELETE_CONTAINER_FORM');
export const SHOW_EDIT_CONTAINER_FORM = appNamespace.defineAction('SHOW_EDIT_CONTAINER_FORM');
export const HIDE_CONTAINER_FORM = appNamespace.defineAction('HIDE_CONTAINER_FORM');
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
  filter: '',
  showContainerForm: ModalTypes.NONE,
  selectedContainer: undefined,
  showItemForm: ModalTypes.NONE,
  selectedItem: undefined
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

const containerFormReducer = formModalHandler({
  formKey: 'showContainerForm',
  hide: HIDE_CONTAINER_FORM,
  selectedKey: 'selectedContainer',
  showAdd: TOGGLE_ADD_CONTAINER_FORM,
  showDelete: SHOW_DELETE_CONTAINER_FORM,
  showEdit: SHOW_EDIT_CONTAINER_FORM
});

// const itemFormReducer = formModalHandler({
//   showAdd: 
// });

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
  let containers = {};
  switch (action.type) {
    case REQUEST_CONTAINERS.SUCCESS: 
      action.payload.forEach(container => containers[container.id] = container );
      return {
          ...state,
          containers,
          selectedId: action.payload[0].id+''
      };    
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
      containers = Object.assign({}, state.containers);
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
      return updateItemReducer(state, action); 
    case SET_ITEMS_FILTER:
      return {
        ...state,
        filter: action.payload
      };  
    case TOGGLE_ADD_CONTAINER_FORM:
    case SHOW_EDIT_CONTAINER_FORM:
    case SHOW_DELETE_CONTAINER_FORM:
    case HIDE_CONTAINER_FORM:
      return containerFormReducer(state, action);               
    default:
      return state
  }
}


//// action creators
const requestContainers = createAction(REQUEST_CONTAINERS);
const receiveContainers = createAction(REQUEST_CONTAINERS.SUCCESS);
const selectContainer = createAction(SELECT_CONTAINER);

export const toggleAddContainerForm = createAction(TOGGLE_ADD_CONTAINER_FORM);
export const hideContainerForm = createAction(HIDE_CONTAINER_FORM);
export const showDeleteContainerForm = createAction(SHOW_DELETE_CONTAINER_FORM);
export const showEditContainerForm = createAction(SHOW_EDIT_CONTAINER_FORM);

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
