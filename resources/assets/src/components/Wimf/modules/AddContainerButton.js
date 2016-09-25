import React from 'react';

import {Icon} from '../../common/common';


const AddContainerButton = ({clickHandler}) => {
  return <Icon id='add-container-button' className='add-button' icon='plus-square' 
  	size='3x' title='Add Container'
  	onClick={e => {e.preventDefault(); clickHandler();  }} />
};

export default AddContainerButton;