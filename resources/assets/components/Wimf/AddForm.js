import React from 'react';
import { Button, Alert } from 'react-bootstrap';
import {reduxForm} from 'redux-form';

import InlineField from '../common/InlineField';
import { fetchContainers } from '../../actions/containers';
import { add } from '../../actions/items';
import { NoOp } from '../common/common';


const fields = ['category', 'item', 'measurement', 'quantity', 'date', 'container'];

const AddFormError = ({ error }) => {  
	return error === '' ?
		<NoOp /> :
		(
			<Alert bsStyle="danger">
			{ error }
			</Alert>
		);
}

const submit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
  	let valid = true;
  	//// required fields	
	['category', 'item'].map(field => {
		if (!values[field] || values[field] === '') {
			valid = false;
			reject({ [field]: `${field} is required` })
		} 
	});
	if (valid) {
		dispatch(add(values));	
		dispatch(fetchContainers());
		resolve();
	}
  });
};



const AddForm = ({ containerId, serverError,
			fields: { category, item, measurement, quantity, date, container },
	      handleSubmit,
	      resetForm,
	      submitting }) => (
	<form onSubmit={ e => { 
			e.preventDefault(); 
			handleSubmit(); 
			resetForm(); 
		}}>
		<fieldset>
			<legend>Add Item</legend>
			<AddFormError error={serverError} />
			<InlineField autoFocus id='category' label='Category' {...category} />
			{' '}
			<InlineField id='item' label='Item' {...item} />
			{' '}
			<InlineField id='quantity' label='Quantity' {...quantity} />
			{' '}			
			<InlineField id='measurement' label='Measurement' {...measurement} />
			{' '}
			<InlineField id='date' label='Date' {...date} />
			{' '}
			<input type='hidden' id='container' value={containerId} {...container} />
			<Button type='submit' bsStyle="success" bsSize='small'>Add</Button>
		</fieldset>
	</form>
);

const mapStateToProps = ({ containers: { selected }, addForm: { error: serverError } }) => {
	const containerId = selected && selected.id ? selected.id : -1;
	return {
		containerId,
		serverError
	};
};


export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'item',                           // a unique name for this form
  fields: fields, // all the fields in your form,
  onSubmit: submit
}, mapStateToProps)(AddForm);