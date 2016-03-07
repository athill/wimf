import React from 'react';
import { connect } from 'react-redux';

import {Icon} from '../common/common';
//// actions
import { toggleAddItemForm } from '../../actions/itemForm';

const AddItemButton = ({clickHandler = e => e}) => {
  return <Icon id='add-item-button' icon='plus-square' 
  	size='3x' title='Add Item'
  	onClick={e => {e.preventDefault(); clickHandler();  }} />
};
AddItemButton.defaultProps = {
  addButtonClickHandler: e => e
};

const mapDispatchToProps = (dispatch) => {
  return {
    clickHandler: () => {
      dispatch(toggleAddItemForm());
    }
  };
};

export default connect(null, mapDispatchToProps)(AddItemButton);