import React from 'react';
import { Checkbox } from 'react-bootstrap';
import { connect } from 'react-redux';
import { reduxForm, change, Field } from 'redux-form';
import moment from 'moment';

import { add, remove, edit } from '../../redux/modules/items';
import { hideItemForm } from '../../redux/modules/itemForm';
import { ModalTypes } from '../../util/formModal';
import FormModal from '../common/FormModal';
import Datepicker from '../common/Datepicker';
import ValidatedInput from '../common/ValidatedInput';

//// utils
import { getValueFormat, isValidDate, momentFormats, getDisplayFormat } from '../../util/DateUtils';

const formName = 'item';

const validate = values => {
	const errors = {};
  	//// required fields	
	['category', 'name'].forEach(field => {
		if (!values[field] || values[field] === '') {
			errors[field] = `${field} is required`;
		} 
	});
	//// date validation
	if (values.date && !isValidDate(values.date)) {
		errors.date = `Invalid date: valid formats are ${momentFormats.join(', ')}`;
	}
	return errors;
};





export const ItemForm = ({ serverErrors, showModal, onHide, readOnly, submitAction, title, initialValues,
			type, submitButtonBsStyle, submitButtonText, 
	      handleSubmit,
	      reset,
	      submitting }) => {
	const submit  = (values, dispatch) => {
	  return new Promise((resolve, reject) => {
		dispatch(submitAction(values));	

		reset();
		if (values.keepOpen) {
			dispatch(change(formName, 'keepOpen', true));
			const category = document.getElementById('category');
			category.focus();
		} else {
			onHide();	
		}
		resolve();
	  });		
	};
	// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
	// const submit2 = values => sleep(10).then(() => console.log('here'), errors => console.log('errors', errors));
	return (<FormModal title={title} valid={true} show={showModal} errors={serverErrors} submitButtonBsStyle={submitButtonBsStyle} 
		submitButtonText={submitButtonText}
		onSubmit={handleSubmit(submit)} 
		onHide={() => {
			reset(); 
			onHide();
		}}>
		<Field type='text' autoFocus id='category' readOnly={readOnly} label='Category' name="category" component={ValidatedInput} />
		<Field type='text' id='name' label='Name' readOnly={readOnly} name="name" component={ValidatedInput} />
		<Field type='text' id='quantity' label='Quantity' readOnly={readOnly} name="quantity" component={ValidatedInput} />
		<Field id='date' label='Date' readOnly={readOnly} name="date" component={ValidatedInput} /> 
		{ ModalTypes.CREATE === type && <Field name="keepOpen" id='keepOpen' component={Checkbox}>Keep Open</Field> }
	</FormModal>)
};
//, addForm: { show : showAddForm }
const mapStateToProps = ({ itemForm: { errors, show, selected } }) => {
	let submitAction, title, submitButtonBsStyle;
	switch (show) {
		case ModalTypes.DELETE:
			submitAction = remove;
			title = 'Delete';
			submitButtonBsStyle='danger';
			break;
		case ModalTypes.EDIT:
			submitAction = edit;
			title = 'Edit';
			submitButtonBsStyle='primary';
			break;
		case ModalTypes.CREATE:
			submitAction = add;
			title = 'Add';
			submitButtonBsStyle='success';
			break;			
		case ModalTypes.NONE:
			//// do nothing
			break;
		default:
			console.error('Invalid Modal Type', show);
	}
	const submitButtonText = title;
	title += ' Item';
	let initialValues = {};
	if (show === ModalTypes.CREATE) {
		initialValues = { date: getValueFormat(moment().startOf('day')) };
	} else if (selected) {
		initialValues = { ...selected, date: getDisplayFormat(selected.date) };
	}			
	return {
		serverErrors: errors,
		showModal: show !== ModalTypes.NONE,
		type: show,
		title,
		submitAction,
		submitButtonBsStyle,
		submitButtonText,
		readOnly: show === ModalTypes.DELETE,
		initialValues
	};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHide: () => {
      dispatch(hideItemForm());
    }
  };
};

const form = reduxForm({
	form: formName,
	validate,
	enableReinitialize: true
});

export default connect(mapStateToProps, mapDispatchToProps)(form(ItemForm));