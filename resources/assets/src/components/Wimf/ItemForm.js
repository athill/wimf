import React from 'react';
import { Checkbox } from 'react-bootstrap';
import { connect } from 'react-redux';
import { reduxForm, change, Field } from 'redux-form';
import moment from 'moment';

import { add, remove, edit } from '../../redux/modules/items';
import { hideItemForm } from '../../redux/modules/itemForm';
import { ModalTypes } from '../../util/formModal';
import FormModal from '../common/FormModal';
// import Datepicker from '../common/Datepicker';
import ValidatedInput from '../common/ValidatedInput';

//// utils
import { getValueFormat, isValidDate, momentFormats, getDisplayFormat } from '../../util/DateUtils';

const fields = ['category', 'name', 'quantity', 'date', 'container', 'id', 'keepOpen'];

const formName = 'item';

const validate = values => {
	const errors = {};
  	//// required fields	
	['category', 'name'].forEach(field => {
		if (!values[field] || values[field] === '') {
			errors[field] = `${field} is required`;
		} 
	});
	if (values.date !== '' && !isValidDate(values.date)) {
		errors.date = `Invalid date: valid formats are ${momentFormats.join(', ')}`;
	}

	return errors;
};


// export const ItemForm = (readOnly) => (
// 	<FormModal>
// 		<Field type='text' id='quantity' label='Quantity' readOnly={readOnly} name="quantity" containerComponent={ValidatedInput} />
// 	</FormModal>
// );


export const ItemForm = ({ containerId, serverErrors, showModal, onHide, readOnly, submitAction, title,
			type, submitButtonBsStyle, submitButtonText, 
			// fields: { category, name, quantity, date, container, id, keepOpen },
	      handleSubmit,
	      resetForm,
	      submitting }) => {
	console.log('showItemForm', showModal);
	const submit  = (submitAction) => (values, dispatch) => {
	  return new Promise((resolve, reject) => {
		dispatch(submitAction(values));	

		resetForm();
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
	return (<FormModal title={title} valid={true} show={showModal} errors={serverErrors} submitButtonBsStyle={submitButtonBsStyle} 
		submitButtonText={submitButtonText}
		onSubmit={handleSubmit(submit(submitAction))} onHide={() => {
			resetForm(); 
			onHide();
		}}>
		{/*  <Field type='text' autoFocus id='category' readOnly={readOnly} label='Category' name="category" containerComponent={ValidatedInput} />
		<Field type='text' id='name' label='Name' readOnly={readOnly} {...name} />
		<Field type='text' id='quantity' label='Quantity' readOnly={readOnly} name="quantity" containerComponent={ValidatedInput} />
		<Datepicker id='date' label='Date' readOnly={readOnly} {...date} /> 
		<input type='hidden' id='container' value={containerId} name="container"  />
		{ ModalTypes.CREATE === type && <Checkbox name="keepOpen" id='keepOpen'>Keep Open</Checkbox> }

		{ [ModalTypes.EDIT, ModalTypes.DELETE].indexOf(type) > 0 && <input type='hidden' id='id' {...id} /> } */}

	</FormModal>)
};
//, addForm: { show : showAddForm }
const mapStateToProps = ({ containers: { selected }, 
		itemForm: { errors, show, selected: selectedItem } }) => {
	const containerId = selected && selected.id ? selected.id : -1;
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
	if (selectedItem) {
		selectedItem.date = getDisplayFormat(selectedItem.date);	
	}
	return {
		containerId,
		serverErrors: errors,
		showModal: show !== ModalTypes.NONE,
		type: show,
		title,
		submitAction,
		submitButtonBsStyle,
		submitButtonText,
		readOnly: show === ModalTypes.DELETE,
		initialValues: show === ModalTypes.CREATE ? { date: getValueFormat(moment().startOf('day')) } : 
													selectedItem
	};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHide: () => {
      dispatch(hideItemForm());
    }
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ 
//   form: formName,
//   validate,
// }), (ItemForm));

const form = reduxForm({
	form: formName,
	validate
});

export default connect(mapStateToProps, mapDispatchToProps)(form(ItemForm));