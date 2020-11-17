import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import map from 'lodash/map';
import moment from 'moment';


import FormModal from '../../common/FormModal';
import Datepicker from '../../common/Datepicker';
import ReduxFormCheckbox from '../../common/ReduxFormCheckbox';
import ValidatedInput from '../../common/ValidatedInput';
//// modules
import { addItem, editItem, hideItemForm, ITEM_FORM_NAME, removeItem } from '../../../modules/containers';
//// utils
import { ModalTypes } from '../../../modules/utils';
import { getValueFormat, isValidDate, momentFormats, getDisplayFormat } from '../../../util/DateUtils';

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

const submit = submitAction => (values, dispatch) => {
	return new Promise((resolve, reject) => dispatch(submitAction(values, resolve, reject)))
		.catch(error => {
			throw new SubmissionError(error);
		});

};

export const ItemForm = ({ categories, error, handleSubmit, initialValues, onHide, readOnly, reset, showModal, submitAction, 
		submitButtonBsStyle, submitButtonText, submitting, title, type }) => {
	return (
		<FormModal 
				errors={error}
				onHide={() => { reset(); onHide();}}
				onSubmit={handleSubmit(submit(submitAction))} 
				show={showModal}
				title={title} 
				valid={true}   
				submitButtonBsStyle={submitButtonBsStyle} 
				submitButtonText={submitButtonText}
				submitting={submitting}>


			<Field type='text' list="categories-list" autoFocus id='category' readOnly={readOnly} label='Category' name="category" component={ValidatedInput} />
			<datalist id="categories-list">
				{
				  categories.map(category => <option key={category} value={category} />)
				}
			</datalist>
			<Field type='text' id='name' label='Name' readOnly={readOnly} name="name" component={ValidatedInput} />
			<Field type='text' id='quantity' label='Quantity' readOnly={readOnly} name="quantity" component={ValidatedInput} />
			<Field id='date' label='Date' readOnly={readOnly} name="date" component={Datepicker} /> 
			{ ModalTypes.CREATE === type && <Field name='keepOpen' component={ReduxFormCheckbox}>Keep Open</Field> }
		</FormModal>
	)
};

const mapStateToProps = ({ containers: { containers, selectedId, selectedItem, showItemForm }, form }) => {
	let submitAction, title, submitButtonBsStyle;
	const categories = selectedId ? map(containers[selectedId].categories, 'name') : [];
	switch (showItemForm) {
		case ModalTypes.DELETE:
			submitAction = removeItem;
			title = 'Delete';
			submitButtonBsStyle='danger';
			break;
		case ModalTypes.EDIT:
			submitAction = editItem;
			title = 'Edit';
			submitButtonBsStyle='primary';
			break;
		case ModalTypes.CREATE:
			submitAction = addItem;
			title = 'Add';
			submitButtonBsStyle='success';
			break;			
		case ModalTypes.NONE:
			//// do nothing
			break;
		default:
			console.error('Invalid Modal Type', showItemForm);
	}
	const submitButtonText = title;
	title += ' Item';
	let initialValues = {};
	if (showItemForm === ModalTypes.CREATE) {
		initialValues = { date: getValueFormat(moment().startOf('day')) };
	} else if (selectedItem) {
		initialValues = { ...selectedItem, date: getDisplayFormat(selectedItem.date) };
	}
	const error = form.item && form.item.error;
	return {
		categories,
		error,
		showModal: showItemForm !== ModalTypes.NONE,
		type: showItemForm,
		title,
		submitAction,
		submitButtonBsStyle,
		submitButtonText,
		readOnly: showItemForm === ModalTypes.DELETE,
		initialValues
	};
};
ItemForm.displayName = 'ItemForm';

const mapDispatchToProps = (dispatch) => {
  return {
    onHide: () => {
      dispatch(hideItemForm());
    }
  };
};

const form = reduxForm({
	form: ITEM_FORM_NAME,
	validate,
	enableReinitialize: true
});

export default connect(mapStateToProps, mapDispatchToProps)(form(ItemForm));