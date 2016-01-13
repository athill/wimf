import React from 'react';
import { Button } from 'react-bootstrap';

import InlineField from '../common/InlineField';

const AddForm = () => (
	<form>
		<fieldset>
			<legend>Add Item</legend>
			<InlineField id='categeory' label='Categeory' />
			{' '}
			<InlineField id='measurement' label='Measurement' />
			{' '}
			<InlineField id='quantity' label='Quantity' />
			{' '}
			<InlineField id='measurement' label='Measurement' />
			{' '}
			<Button type='submit' bsStyle="success">Add</Button>
		</fieldset>
	</form>
);

export default AddForm;