import React from 'react';
import { connect } from 'react-redux';
//// actions
import { fetchContainers, select as selectContainer } from '../../../redux/modules/containers';
import { setItemsFilter } from '../../../redux/modules/items';
import { showDeleteItemForm, showEditItemForm, toggleAddItemForm } from '../../../redux/modules/itemForm';
import { showDeleteContainerForm, showEditContainerForm, toggleAddContainerForm } from '../../../redux/modules/containerForm';

//// components
import AddItemButton from '../../common/AddButton';
import Container from './Container';
import ContainerSelector from './ContainerSelector';
import Filter from '../../common/Filter';
import ItemForm from './ItemForm';
import ContainerForm from './ContainerForm';


//// utils
import { filterCategories } from '../../../util/ContainerOperations';

export const mapStateToProps = ({containers, items: { categories, filter, name: containerName, loading: containerLoading }}) => {
  if (filter !== '') {
    categories = filterCategories(categories, filter);
  }
  return {
    containers,
    categories,
    containerName,
    containerLoading
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
        itemDeleteClickHandler, handleFilterChange, containerLoading, handleContainerChange } = this.props;
    return (
      <div>
          <ContainerSelector containers={containers} handleSelect={handleContainerChange} editContainer={editContainer} deleteContainer={deleteContainer}  />
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