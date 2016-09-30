import React from 'react';
import { connect } from 'react-redux';

import {Icon} from './common';

const AddButton = ({title, clickHandler = e => e}) => {
	console.log('title', title);
	const id = title.toLowerCase().split(' ').join('-') + '-button';
	return <Icon id={id} icon='plus-square' size='3x' title={title	}
		onClick={e => {e.preventDefault(); clickHandler();  }} />
};
AddButton.defaultProps = {
  addButtonClickHandler: e => e
};


export default AddButton;