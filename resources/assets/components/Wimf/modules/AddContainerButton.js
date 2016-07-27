import React from 'react';
import { connect } from 'react-redux';

import {Icon} from '../../common/common';
//// actions
// import { toggleAddForm } from '../../actions/containerForm';

const AddContainerButton = ({clickHandler = e => e}) => {
  return <Icon id='add-container-button' className='add-button' icon='plus-square' 
  	size='3x' title='Add Container'
  	onClick={e => {e.preventDefault(); clickHandler();  }} />
};
AddContainerButton.defaultProps = {
  addButtonClickHandler: e => e
};

const mapDispatchToProps = (dispatch) => {
  return {
    // clickHandler: () => {
    //   dispatch(toggleAddItemForm());
    // }
  };
};

export default connect(null, mapDispatchToProps)(AddContainerButton);