import PropTypes from 'prop-types';
import React from 'react';
import { Checkbox } from 'react-bootstrap';


const ReduxFormCheckbox = ({children, id, input, name, ...other}) => (
	<Checkbox id={id || name} name={name} {...input} {...other}>{ children }</Checkbox>
);
ReduxFormCheckbox.propTypes = {
	id: PropTypes.string,
	input: PropTypes.object,
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
};
ReduxFormCheckbox.displayName = 'ReduxFormCheckbox';

export default ReduxFormCheckbox;
