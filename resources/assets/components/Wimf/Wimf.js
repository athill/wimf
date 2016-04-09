import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//// actions
import { fetchContainers } from '../../actions/containers';
import { setItemsFilter } from '../../actions/items';
import { showDeleteItemForm, showEditItemForm } from '../../actions/itemForm';
import { fetchUserInfo } from '../../actions/user';
//// components
import AddItemButton from './AddItemButton';
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
  return {
    handleFilterChange: value => {
      dispatch(setItemsFilter(value));
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
    dispatch(fetchUserInfo());
  }

  render() {
    const {containers, containerName, categories, itemEditClickHandler, itemDeleteClickHandler, handleFilterChange, 
      containerLoading } = this.props;
    return (
      <div>
          <ContainerSelector containers={containers} />
          <Filter handleChange={handleFilterChange} />
          <Container name={containerName} categories={categories} 
            loading={containerLoading}
            itemEditClickHandler={itemEditClickHandler}
            itemDeleteClickHandler={itemDeleteClickHandler} />
          <AddItemButton />
          <ItemForm /> 
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wimf);