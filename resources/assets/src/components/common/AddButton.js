import React from 'react';

import {Icon} from './common';

const AddButton = ({title, clickHandler = e => e}) => {
	const id = title.toLowerCase().split(' ').join('-') + '-button';
	return <Icon id={id} icon='plus-square' size='3x' title={title	}
		onClick={e => {e.preventDefault(); clickHandler();  }} />
};
AddButton.defaultProps = {
  addButtonClickHandler: e => e
};


export default AddButton;