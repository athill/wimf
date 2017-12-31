import PropTypes from 'prop-types';
import React from 'react';
import { Checkbox } from 'react-bootstrap';


const ReduxFormCheckbox = ({children, id, input, meta, ...other}) => {
	console.log(input);
	console.log(other);
	return (
	<Checkbox id={id || input.name} {...input} {...other}>{ children }</Checkbox>
)};
ReduxFormCheckbox.propTypes = {
	id: PropTypes.string,
	input: PropTypes.object,
	label: PropTypes.string
};
ReduxFormCheckbox.displayName = 'ReduxFormCheckbox';

export default ReduxFormCheckbox;
