import React from 'react';
import { Checkbox } from 'react-bootstrap';


const ReduxFormCheckbox = ({children, id, input, name, ...other}) => (
	<Checkbox id={id || name} name={name} {...input} {...other}>{ children }</Checkbox>
);
ReduxFormCheckbox.propTypes = {
	id: React.PropTypes.string,
	input: React.PropTypes.object,
	label: React.PropTypes.string,
	name: React.PropTypes.string.isRequired,
};
ReduxFormCheckbox.displayName = 'ReduxFormCheckbox';

export default ReduxFormCheckbox;
