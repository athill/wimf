import axios from 'axios';
import { createAction } from 'redux-actions';
import { SubmissionError } from 'redux-form';
import find from 'lodash/find';

//// utils
import { getIsoFormat } from '../util/DateUtils';

import { get, deleteRequest, download, post, put } from '../util/RemoteOperations';

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
} from '../util/ContainerOperations';
import { 
  appNamespace, 
  formModalReducer, 
  getConstants, 
  keepOpenHandler, 
  loadingStates,
  ModalTypes, 
  updateEntity 
} from './utils';


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
export const SOFT_DELETE_ITEM = 'SOFT_DELETE_ITEM';
export const SOFT_DELETE_ITEM_CANCEL = 'SOFT_DELETE_ITEM_CANCEL';
export const DELETE_ITEM = getConstants('DELETE_ITEM');
export const EDIT_ITEM = getConstants('EDIT_ITEM');
export const SET_ITEMS_FILTER = appNamespace.defineAction('SET_ITEMS_FILTER');

export const TOGGLE_ADD_ITEM_FORM = appNamespace.defineAction('TOGGLE_ADD_ITEM_FORM');
export const SHOW_DELETE_ITEM_FORM = appNamespace.defineAction('SHOW_DELETE_ITEM_FORM');
export const SHOW_EDIT_ITEM_FORM = appNamespace.defineAction('SHOW_EDIT_ITEM_FORM');
export const HIDE_ITEM_FORM = appNamespace.defineAction('HIDE_ITEM_FORM');

export const POST_DEMO_DATA = appNamespace.defineAction('POST_DEMO_DATA');
export const RECEIVE_DEMO_DATA = appNamespace.defineAction('RECEIVE_DEMO_DATA');

export const EXPORT = getConstants('EXPORT');
export const IMPORT = getConstants('IMPORT');

export const ITEM_FORM_NAME = 'item';
export const CONTAINER_FORM_NAME = 'container';

//// reducer
export const initialState = {
  containers: [],
  selectedId: null,
  loading: loadingStates.CLEAN,
  filter: '',
  showContainerForm: ModalTypes.NONE,
  selectedContainer: undefined,
  showItemForm: ModalTypes.NONE,
  selectedItem: undefined,
  importFormError: null,
};


const itemsReducer = (state, action) => {
  let categories = state.containers[state.selectedId].categories;
  const updateContainers = categories => updateCategoriesInContainers(state.containers, state.selectedId, categories);
  switch (action.type) {
    case ADD_ITEM.SUCCESS:
      categories = addItemToCategories(categories, action.payload.data);
      return {
        ...state,
        containers: updateContainers(categories)
      };
    case EDIT_ITEM.SUCCESS:
      categories = updateItemInCategories(categories, action.payload.data);
      return {
        ...state,
        containers: updateContainers(categories)
      };
    case DELETE_ITEM.SUCCESS:
      categories = removeItemFromCategories(categories, action.payload.data);
      return {
        ...state,
        containers: updateContainers(categories)
      };
    case REQUEST_ITEMS:
      return {
        ...state,
        loading: loadingStates.LOADING
      };
    case REQUEST_ITEMS.SUCCESS:
      let containers = Object.assign({}, state.containers);
      const container = action.payload;
      if (!('categories' in container)) {
        throw new Error('categories should exist in container (see fetchItems): ' + container.id);
      }
      return {
        ...state,
        loading: loadingStates.COMPLETE,
        containers: {
          ...containers,
          [container.id]: container
        }
      };  
    case SET_ITEMS_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    case SOFT_DELETE_ITEM:
    case SOFT_DELETE_ITEM_CANCEL:
      let softDeleteItem = action.payload;
      softDeleteItem = {
        ...softDeleteItem,
        deleting: action.type === SOFT_DELETE_ITEM
      };
      categories = updateItemInCategories(categories, softDeleteItem);
      return {
        ...state,
        containers: updateContainers(categories)
      };
    default:
      console.error('Invalid action', action.type);   
      return state;        
  }
};

const containerFormReducer = formModalReducer({
  formKey: 'showContainerForm',
  hide: HIDE_CONTAINER_FORM,
  selectedKey: 'selectedContainer',
  showAdd: TOGGLE_ADD_CONTAINER_FORM,
  showDelete: SHOW_DELETE_CONTAINER_FORM,
  showEdit: SHOW_EDIT_CONTAINER_FORM
});

const itemFormReducer = formModalReducer({
  formKey: 'showItemForm',
  hide: HIDE_ITEM_FORM,
  selectedKey: 'selectedItem',
  showAdd: TOGGLE_ADD_ITEM_FORM,
  showDelete: SHOW_DELETE_ITEM_FORM,
  showEdit: SHOW_EDIT_ITEM_FORM
});

const  containersReducer = (state, action) => {
    switch (action.type) {
      case ADD_CONTAINER.SUCCESS:
        return {
          ...state,
          containers: addContainerToContainers(state.containers, action.payload.data),
          selectedId: action.payload.data.id
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
      case EDIT_CONTAINER.SUCCESS:
        return {
          ...state,
          containers: updateContainerInContainers(state.containers, action.payload.data)
        };        
      case REQUEST_CONTAINERS.SUCCESS: 
        const containers = {};
        action.payload.forEach(container => containers[container.id] = container );
        return  {
            ...state,
            containers
        }; 
      case SELECT_CONTAINER:
        return {
          ...state,
          selectedId:  action.payload || state.selectedId
        };         
      default:
        console.error('Invalid action', action.type); 
        return state;
    }
};

const impexReducer = (state, action) => {
    switch (action.type) {
      case IMPORT.ACTION:
        return {
          ...state,
          importFormError: null
        };       
      case IMPORT.ERROR:
        return {
          ...state,
          importFormError: action.payload
        };       
      default:
        console.error('Invalid action', action.type); 
        return state;
    }
}

export default function reducer(state = initialState, action) {
  if (!action) {
    return state;
  }
  switch (action.type) { 
    //// container actions  
    case ADD_CONTAINER.SUCCESS:
    case EDIT_CONTAINER.SUCCESS:
    case DELETE_CONTAINER.SUCCESS:
    case REQUEST_CONTAINERS.SUCCESS:
    case SELECT_CONTAINER: 
      return containersReducer(state, action);
    //// item actions
    case ADD_ITEM.SUCCESS:
    case DELETE_ITEM.SUCCESS:
    case EDIT_ITEM.SUCCESS:
    case REQUEST_ITEMS:
    case REQUEST_ITEMS.SUCCESS:    
    case SET_ITEMS_FILTER:
    case SOFT_DELETE_ITEM:
    case SOFT_DELETE_ITEM_CANCEL:
      return itemsReducer(state, action); 
    //// container form actions  
    case TOGGLE_ADD_CONTAINER_FORM:
    case SHOW_EDIT_CONTAINER_FORM:
    case SHOW_DELETE_CONTAINER_FORM:
    case HIDE_CONTAINER_FORM:
      return containerFormReducer(state, action); 
    //// item form actions
    case TOGGLE_ADD_ITEM_FORM:
    case SHOW_EDIT_ITEM_FORM:
    case SHOW_DELETE_ITEM_FORM:
    case HIDE_ITEM_FORM:
      return itemFormReducer(state, action); 
    //// import/export reducer
    case EXPORT.SUCCESS:
    case IMPORT.ACTION:
    case IMPORT.ERROR:
    case IMPORT.SUCCESS:
      return impexReducer(state, action);
    default:
      return state;
  }
}

const act = (type, payload) => ({ type, payload });

//// action creators
const selectContainer = createAction(SELECT_CONTAINER);

export const toggleAddContainerForm = createAction(TOGGLE_ADD_CONTAINER_FORM);
export const hideContainerForm = createAction(HIDE_CONTAINER_FORM);
export const showDeleteContainerForm = createAction(SHOW_DELETE_CONTAINER_FORM);
export const showEditContainerForm = createAction(SHOW_EDIT_CONTAINER_FORM);

//// items
const requestItems = createAction(REQUEST_ITEMS);
const receiveItems = createAction(REQUEST_ITEMS.SUCCESS);
export const setItemsFilter = createAction(SET_ITEMS_FILTER);

export const hideItemForm = createAction(HIDE_ITEM_FORM);
export const showDeleteItemForm = createAction(SHOW_DELETE_ITEM_FORM);
export const showEditItemForm = createAction(SHOW_EDIT_ITEM_FORM);
export const toggleAddItemForm = createAction(TOGGLE_ADD_ITEM_FORM);

export const exportDemoData = () => {
  const data = localStorage.getItem('wimf') ? JSON.parse(localStorage.getItem('wimf')).containers : [];
  return dispatch => {
    dispatch(act(POST_DEMO_DATA));
    axios({
          method: 'POST',
          url: '/demo/export',
          data: { data }
      })
      .then(response => { 
        dispatch(act(RECEIVE_DEMO_DATA));
        window.location = `/demo/export/?filename=${response.data.filename}`
      })
      .catch(error => console.error(error));
  }
}


//// https://stackoverflow.com/questions/29452031/how-to-handle-file-downloads-with-jwt-based-authentication ???
export const exportData = () => {
  return async dispatch => {
    try {
      dispatch(createAction(EXPORT)());
      return await get('/api/export', 
        response => {
          const filename = 'export.json';
          const content = response.data;
          download({ content, filename });
          dispatch(act(EXPORT.SUCCESS));
        }
      );
    } catch (error) {
      throw error;
    }
  }
}

// https://gist.github.com/AshikNesin/e44b1950f6a24cfcd85330ffc1713513
export const importData = (file) => {
  return async dispatch => {
    try {
      dispatch(act(IMPORT.ACTION));
      if (!file) {
        throw new Error('Invalid file');
      }
      const url = '/api/import';
      const formData = new FormData();
      formData.append('file', file);
      formData.append('foo', 'bar');
      console.log('formData', formData, file);
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          },
          data: formData //// required so config isn't wrapped in `data` key in remoteoperations
      }
      const result = await post(url, config);
      console.log(result);
      // fetchContainers()(dispatch);
    } catch (exception) {
      dispatch(act(IMPORT.ERROR, exception.message));
    }
  }
};

//// containers
export const fetchContainers = () => {
  return dispatch => {
    dispatch(act(REQUEST_CONTAINERS));
    return get(
      '/api/containers',
      response => {
        let { containers, selected } = response.data;
        dispatch(act(REQUEST_CONTAINERS.SUCCESS, containers));
        if (!(selected in containers)) {
          selected = containers[0].id;
        }
        dispatch(selectContainer(selected));
        dispatch(fetchItems(selected));
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

//// select container action
export const select = id => {
  return (dispatch, getState) => {
    dispatch(selectContainer(id));
    dispatch(fetchItems(id));
  };
};

//// Item actions
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
  url: '/api/items/{id}',
});

export const getStateItem = (state, item) => {
  const containers = state.containers;
  const container = containers.containers[containers.selectedId];
  const category = find(container.categories, { name: item.category });
  return find(category.items, { name: item.name});  
}

export const softRemoveItem = item => {
  return (dispatch, getState) => {
    dispatch(createAction(SOFT_DELETE_ITEM)(item));
    setTimeout(() => {
      const stateItem = getStateItem(getState(), item);
      if (stateItem.deleting) {
          return new Promise((resolve, reject) => {
            dispatch(removeItem(item, resolve, reject));
        })
        .catch(error => {
          throw new SubmissionError(error);
        }); 
      }
    }, 5000);
  };  
};

export const softRemoveItemCancel = item => {
  return (dispatch, getState) => {
    dispatch(createAction(SOFT_DELETE_ITEM_CANCEL)(item));
  };
};
