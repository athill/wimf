import React from 'react';
import { Checkbox } from 'react-bootstrap';
import { Field, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';

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
		<Field type='text' autoFocus id='name' name="name" readOnly={readOnly} label='Name' component={ValidatedInput} />
		<Field type='text' id='description' name="description" label='Description' readOnly={readOnly} component={ValidatedInput} />
		{ ModalTypes.CREATE === type && <Checkbox id='keepOpen'>Keep Open</Checkbox> }

		{ [ModalTypes.EDIT, ModalTypes.DELETE].indexOf(type) > 0 && <input type='hidden' id='id' /> }

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

const form = reduxForm({
	form: formName,
	validate
});

export default connect(mapStateToProps, mapDispatchToProps)(form(ContainerForm));
