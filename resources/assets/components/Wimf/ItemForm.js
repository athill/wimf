import React from 'react';
import { Button, Alert } from 'react-bootstrap';
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';


import { fetchContainers } from '../../actions/containers';
import { add, remove } from '../../actions/items';
import { hideItemForm } from '../../actions/itemForm';
import { ModalTypes } from '../../constants/ActionTypes';
import { NoOp } from '../common/common';
import FormModal from '../common/FormModal';
// import InlineField from '../common/InlineField';
import ValidatedInput from '../common/ValidatedInput';

const fields = ['category', 'name', 'measurement', 'quantity', 'date', 'container', 'id'];

const validate = values => {
	const errors = {};
  	//// required fields	
	['category', 'name'].map(field => {
		if (!values[field] || values[field] === '') {
			errors[field] = `${field} is required`;
		} 
	});
	return errors;
};

const submit = (submitAction) => (values, dispatch) => {
  console.log('in submit');
  return new Promise((resolve, reject) => {
	dispatch(submitAction(values));	
	dispatch(fetchContainers());
	resolve();
  });
};

const ItemForm = ({ containerId, serverErrors, showModal, onHide, readOnly, submitAction, title,
			type, 
			fields: { category, name, measurement, quantity, date, container, id },
	      handleSubmit,
	      resetForm,
	      submitting }) => (
	<FormModal title={title} valid={true} show={showModal} errors={serverErrors} 
		onSubmit={() => {
			console.log('submitting', submitAction);
			handleSubmit(submit(submitAction));
			resetForm();
			onHide();
		}} onHide={() => {
			resetForm(); 
			onHide();
		}}>
		<ValidatedInput type='text' autoFocus id='category' readOnly={readOnly} label='Category' {...category} />
		{' '}
		<ValidatedInput type='text' id='name' label='Name' readOnly={readOnly} {...name} />
		{' '}
		<ValidatedInput type='text' id='quantity' label='Quantity' readOnly={readOnly} {...quantity} />
		{' '}			
		<ValidatedInput type='text' id='measurement' label='Measurement' readOnly={readOnly} {...measurement} />
		{' '}
		<ValidatedInput type='text' id='date' label='Date' readOnly={readOnly} {...date} />
		{' '}
		<input type='hidden' id='container' value={containerId} {...container} />

		{ [ModalTypes.EDIT, ModalTypes.DELETE].indexOf(type) > 0 && <input type='hidden' id='id' {...id} /> }

	</FormModal>
);
//, addForm: { show : showAddForm }
const mapStateToProps = ({ containers: { selected }, 
		itemForm: { errors, show, selected: selectedItem } }) => {
	const containerId = selected && selected.id ? selected.id : -1;
	let submitAction, title;
	switch (show) {
		case ModalTypes.DELETE:
			submitAction = remove;
			title = 'Delete';
			break;
		case show === ModalTypes.EDIT:
			submitAction = editItem;
			title = 'Edit';
			break;
		case ModalTypes.CREATE:
			submitAction = add;
			title = 'Add';
			break;			
		case ModalTypes.NONE:
			//// do nothing
			break;
		default:
			console.error('Invalid Modal Type', show);
	}
	title += ' Item';
	return {
		containerId,
		serverErrors: errors,
		showModal: show !== ModalTypes.NONE,
		type: show,
		title,
		submitAction,
		readOnly: show === ModalTypes.DELETE,
		initialValues: show === ModalTypes.CREATE ? {} : selectedItem
	};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHide: () => {
      dispatch(hideItemForm());
    }
  };
};


export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'item',                           // a unique name for this form
  fields: fields, // all the fields in your form,
  validate,
}, mapStateToProps, mapDispatchToProps)(ItemForm);