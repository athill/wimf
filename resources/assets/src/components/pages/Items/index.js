import React from 'react';
import { connect } from 'react-redux';
//// actions
import { 
  fetchContainers, 
  select as selectContainer, 
  setItemsFilter, 
  showDeleteContainerForm, 
  showEditContainerForm, 
  toggleAddContainerForm 
} from '../../../redux/modules/containers';
import { showDeleteItemForm, showEditItemForm, toggleAddItemForm } from '../../../redux/modules/itemForm';

//// components
import AddItemButton from '../../common/AddButton';
import Container from './Container';
import ContainerForm from './ContainerForm';
import ContainerSelector from './ContainerSelector';
import Filter from '../../common/Filter';
import ItemForm from './ItemForm';

//// utils
import { filterCategories } from '../../../util/ContainerOperations';

export const mapStateToProps = ({ containers: { containers, filter, loading, selectedId } }) => {
  const container = containers[selectedId] 
  let categories = container && container.categories ? container.categories : [];
  if (filter !== '') {
    categories = filterCategories(categories, filter);
  }
  return {
    containers,
    categories,
    containerName: (container && container.name) || null,
    containerLoading: loading,
    selectedId
  };
};

const mapDispatchToProps = (dispatch) => ({  
    editContainer: (container) => {
      dispatch(showEditContainerForm(container));
    },
    deleteContainer: (container) => {
      dispatch(showDeleteContainerForm(container));
    },  
    handleContainerChange: (eventKey, e) => {
      if (eventKey === 'add-container') {
        dispatch(toggleAddContainerForm());
      } else {
        dispatch(selectContainer(eventKey));
      }
    },    
    handleFilterChange: value => {
      dispatch(setItemsFilter(value));
    },
    itemAddClickHandler: () => {
      dispatch(toggleAddItemForm());
    },    
    itemEditClickHandler: (item) => {
      dispatch(showEditItemForm(item));
    },        
    itemDeleteClickHandler: (item) => {
      dispatch(showDeleteItemForm(item));
    },    
    dispatch
});

export class Items extends React.Component {
  componentDidMount()  {
  	const {dispatch} = this.props;
    dispatch(fetchContainers());
  }

  render() {
    const {containers, containerName, categories, editContainer, deleteContainer, itemAddClickHandler, itemEditClickHandler, 
        itemDeleteClickHandler, handleFilterChange, containerLoading, handleContainerChange, selectedId } = this.props;
    return (
      <div>
          <ContainerSelector containers={containers} handleSelect={handleContainerChange} 
            editContainer={editContainer} deleteContainer={deleteContainer} selectedId={selectedId}  />
          <Filter handleChange={handleFilterChange} />
          <Container name={containerName} categories={categories} 
            loading={containerLoading}
            itemEditClickHandler={itemEditClickHandler}
            itemDeleteClickHandler={itemDeleteClickHandler} />
          <AddItemButton clickHandler={itemAddClickHandler} title='Add Item' />
          <ItemForm />
          <ContainerForm />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Items);