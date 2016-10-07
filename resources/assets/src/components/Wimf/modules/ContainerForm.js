import React from 'react';
import { Input } from 'react-bootstrap';
import { reduxForm, change } from 'redux-form';

import { add, remove, edit } from '../../../redux/modules/containers';
import { hideContainerForm } from '../../../redux/modules/containerForm';
import { ModalTypes } from '../../../util/formModal';
import FormModal from '../../common/FormModal';
import ValidatedInput from '../../common/ValidatedInput';


const fields = ['name', 'description', 'id', 'keepOpen'];

const formName = 'container';

const validate = values => {
	const errors = {};
  	//// required fields	
	['name'].forEach(field => {
		if (!values[field] || values[field] === '') {
			errors[field] = `${field} is required`;
		} 
	});
	return errors;
};


const ContainerForm = ({ serverErrors, showModal, onHide, readOnly, submitAction, title,
			type, submitButtonBsStyle, submitButtonText, 
			fields: { name, description, id, keepOpen },
	      handleSubmit,
	      resetForm,
	      submitting }) => {
	const submit  = (submitAction) => (values, dispatch) => {
	  return new Promise((resolve, reject) => {
		dispatch(submitAction(values));	

		resetForm();
		if (values.keepOpen) {
			dispatch(change(formName, 'keepOpen', true));
			const name = document.getElementById('name');
			name.focus();
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
		<ValidatedInput type='text' autoFocus id='name' readOnly={readOnly} label='Name' {...name} />
		<ValidatedInput type='text' id='description' label='Description' readOnly={readOnly} {...description} />
		{ ModalTypes.CREATE === type && <Input type='checkbox' wrapperClassName='col-xs-offset-1' id='keepOpen' label='Keep Open' {...keepOpen} /> }

		{ [ModalTypes.EDIT, ModalTypes.DELETE].indexOf(type) > 0 && <input type='hidden' id='id' {...id} /> }

	</FormModal>)
};
//, addForm: { show : showAddForm }
const mapStateToProps = ({ containers: { selected }, 
		containerForm: { errors, show, selected: selectedContainer } }) => {
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
	title += ' Container';
	const rtn = {
		serverErrors: errors,
		showModal: show !== ModalTypes.NONE,
		type: show,
		title,
		submitAction,
		submitButtonBsStyle,
		submitButtonText,
		readOnly: show === ModalTypes.DELETE,
		initialValues: selectedContainer,
		containerId
	};
	return rtn;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHide: () => {
      dispatch(hideContainerForm());
    }
  };
};


export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: formName,                           // a unique name for this form
  fields: fields, // all the fields in your form,
  validate,
}, mapStateToProps, mapDispatchToProps)(ContainerForm);