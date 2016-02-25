import React from 'react';
import { Button, Alert } from 'react-bootstrap';
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';


import { fetchContainers } from '../../actions/containers';
import { add } from '../../actions/items';
import { toggleAddForm } from '../../actions/addForm';
import { NoOp } from '../common/common';
import FormModal from '../common/FormModal';
import InlineField from '../common/InlineField';

const fields = ['category', 'name', 'measurement', 'quantity', 'date', 'container'];

const submit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
  	let valid = true;
  	//// required fields	
	['category', 'name'].map(field => {
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

const onSubmit = e => { 
	handleSubmit(); 
	resetForm(); 
};

const AddForm = ({ containerId, serverErrors, showModal, onHide,
			fields: { category, name, measurement, quantity, date, container },
	      handleSubmit,
	      resetForm,
	      submitting }) => (
	<FormModal title='Add Item' valid={true} show={showModal} errors={serverErrors} onSubmit={() => {
			handleSubmit();
			resetForm();
		}} onHide={onHide}>
		<InlineField autoFocus id='category' label='Category' {...category} />
		{' '}
		<InlineField id='name' label='Name' {...name} />
		{' '}
		<InlineField id='quantity' label='Quantity' {...quantity} />
		{' '}			
		<InlineField id='measurement' label='Measurement' {...measurement} />
		{' '}
		<InlineField id='date' label='Date' {...date} />
		{' '}
		<input type='hidden' id='container' value={containerId} {...container} />
	</FormModal>
);
//, addForm: { show : showAddForm }
const mapStateToProps = ({ containers: { selected }, 
		addForm: { errors, show: showModal } }) => {
	const containerId = selected && selected.id ? selected.id : -1;
	return {
		containerId,
		serverErrors: errors,
		showModal
	};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHide: () => {
      dispatch(toggleAddForm());
    }
  };
};


export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'item',                           // a unique name for this form
  fields: fields, // all the fields in your form,
  onSubmit: submit
}, mapStateToProps, mapDispatchToProps)(AddForm);