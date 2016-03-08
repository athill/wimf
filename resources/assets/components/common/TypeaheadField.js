import React from 'react';
import { Input } from 'react-bootstrap';
import Typeahead from 'react-bootstrap-typeahead';

//// components
import ValidatedInput from './ValidatedInput';

const myData = [
	'Meat',
	'Prepared',
	'Sauces'
];

const options = myData.map((option, i) => ({ id: i, name:option  }));


const TypeaheadField = ({ ...field}) => (
	<ValidatedInput {...field} type={undefined}>
		<Typeahead   options={options}/>
	</ValidatedInput>
);

export default TypeaheadField;

