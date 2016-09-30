import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//// actions
import { fetchContainers, select as selectContainer } from '../../redux/modules/containers';
import { setItemsFilter } from '../../redux/modules/items';
import { showDeleteItemForm, showEditItemForm, toggleAddItemForm } from '../../redux/modules/itemForm';

//// components
import AddItemButton from '../common/AddButton';
import Container from './Container';
import ContainerSelector from './ContainerSelector';
import Filter from './Filter';
import ItemForm from './ItemForm';

//// utils
import { filterCategories } from '../../util/ContainerOperations';

const mapStateToProps = ({containers, items: { categories, filter, name: containerName, loading: containerLoading }}) => {
  if (filter != '') {
    categories = filterCategories(categories, filter);
  }
  return {
    containers,
    categories,
    containerName,
    containerLoading
  };
};

const mapDispatchToProps = (dispatch) => {  
    handleContainerChange: e => {
      dispatch(selectContainer(e.target.value));
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
  };
};

class Wimf extends React.Component {
  componentDidMount()  {
  	const {dispatch} = this.props;
    dispatch(fetchContainers());
  }

  render() {
    const {containers, containerName, categories, itemAddClickHandler, itemEditClickHandler, itemDeleteClickHandler, handleFilterChange, 
      containerLoading, handleContainerChange } = this.props;
    return (
      <div>
          <ContainerSelector containers={containers} onChange={handleContainerChange} />
          <Filter handleChange={handleFilterChange} />
          <Container name={containerName} categories={categories} 
            loading={containerLoading}
            itemEditClickHandler={itemEditClickHandler}
            itemDeleteClickHandler={itemDeleteClickHandler} />
          <AddItemButton clickHandler={itemAddClickHandler} title='Add Item' />
          <ItemForm /> 
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wimf);